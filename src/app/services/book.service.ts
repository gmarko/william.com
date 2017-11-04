import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Book} from '../shared/models/book';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject';
import {ERROR_TOAST, SUCCESS_TOAST, ToastService} from './toast.service';
import {FirebaseListFactoryOpts} from 'angularfire2/database/interfaces';

export const BOOKS_PAGE_SIZE = 15;

@Injectable()
export class BookService {

	constructor (
		private db: AngularFireDatabase,
	    private toastService: ToastService
	) { }

	getInitialBooks() {

		const bookKeys$ = this.findBookKeys({
			query: {
				limitToLast: BOOKS_PAGE_SIZE
			}
		});
		return this.findBooksForBookKeys(bookKeys$);

	}

	loadNextPage(currentBookKey: string) {

		const nextPageKeys$ = this.findBookKeys({
			query: {
				orderByKey: true,
				endAt: currentBookKey,
				limitToLast: BOOKS_PAGE_SIZE + 1
			}
		});

		return this.findBooksForBookKeys(nextPageKeys$)
			.map(books => books.slice(0, books.length - 1));

	}

	addBook(bookDetails, bookImage, recommended) {

		const uploadBookMetadata = Object.assign({}, bookDetails);

		this.uploadBookImage(bookImage).then(snap => {

			uploadBookMetadata.coverPhoto = snap.downloadURL;
			uploadBookMetadata.recommended = recommended;

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

	findBookKeys(query: FirebaseListFactoryOpts = {}): Observable<string[]> {
		return this.db.list('bookKeys', query)
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
