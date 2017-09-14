import { database, initializeApp } from 'firebase';
import { firebaseConfig } from '../src/environments/firebase.config';
import { dbData } from './db-data';

initializeApp(firebaseConfig);

const booksRef = database().ref('books');
const bookKeysRef = database().ref('bookKeys');

booksRef.remove();
bookKeysRef.remove();

const currentTime = database.ServerValue.TIMESTAMP;

dbData.books.forEach( book => {

	console.log('adding book: ', book.title);

	const pushedBookKey = booksRef.push().key;

	const bookData: any = Object.assign({}, book);
	bookData.key = pushedBookKey;
	bookData.date_added = currentTime;

	const bookRef = database().ref('books/' + pushedBookKey);
	bookRef.set(bookData);

	bookKeysRef.child(pushedBookKey).set(book.title);

});
