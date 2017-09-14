import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Book} from '../shared/models/book';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject';
import {ERROR_TOAST, SUCCESS_TOAST, ToastService} from './toast.service';

@Injectable()
export class BookService {

	constructor (
		private db: AngularFireDatabase,
	    private toastService: ToastService
	) { }

	getBooks() {

		const bookKeys$ = this.findBookKeys();
		return this.findBooksForBookKeys(bookKeys$);

	}

	addBook(bookDetails, bookImage) {

		const uploadBookMetadata = Object.assign({}, bookDetails);

		this.uploadBookImage(bookImage).then(snap => {

			uploadBookMetadata.coverPhoto = snap.downloadURL;

			this.createBook(uploadBookMetadata).subscribe(upload => {
				this.toastService.showToast(SUCCESS_TOAST, 'Book Successfully Uploaded!');
			});

		}).catch(err => {
			console.log('error occured... ', err);
			this.toastService.showToast(ERROR_TOAST, 'An error occured while uploading the image.');
		});

	}

	uploadBookImage(imageFile) {

		const storageRef = firebase.storage().ref();

		const testImage = storageRef.child('bookImages/' + imageFile.name);

		return testImage.put(imageFile);

	}

	createBook(bookDetails) {

		const newBookKey = this.db.database.ref().child('books').push().key;
		const dataToSave = {};

		bookDetails.key = newBookKey;
		bookDetails.date_added = firebase.database.ServerValue.TIMESTAMP;

		dataToSave['books/' + newBookKey] = bookDetails;
		dataToSave['bookKeys/' + newBookKey] = bookDetails.title;

		return this.firebaseUpdate(dataToSave);

	}

	findBookKeys(): Observable<string[]> {
		return this.db.list('bookKeys')
			.map(books => {
				return books.map(book => book.$key);
			});
	}

	findBooksForBookKeys(bookKeys$: Observable<string[]>): Observable<Book[]> {
		return bookKeys$
			.map(books => {
				return books.map(bookKey => {
					return this.db.object('books/' + bookKey);
				});
			})
			.flatMap(firebaseObjectObservables => Observable.combineLatest(firebaseObjectObservables));
	}

	firebaseUpdate(dataToSave) {

		const subject = new Subject();

		this.db.database.ref().update(dataToSave)
			.then(
				val => {
					subject.next(val);
					subject.complete();
				},
				err => {
					subject.error(err);
					subject.complete();
				}
			);

		return subject.asObservable();

	}

}
