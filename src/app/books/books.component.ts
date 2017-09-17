import {Component, OnInit} from '@angular/core';
import {BOOKS_PAGE_SIZE, BookService} from '../services/book.service';
import {Book} from '../shared/models/book';
import * as _ from 'lodash';

@Component({
	selector: 'books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

	books: Book[];
	allBooksLoaded = false;

	constructor(
		private bookService: BookService
	) { }

	ngOnInit() {

		this.bookService.getInitialBooks().subscribe(
			books => {
				console.log('books recieved: ', books);
				this.books = _.reverse(_.cloneDeep(books));
				if (this.books.length < BOOKS_PAGE_SIZE) {
					console.log('books length too short');
					this.allBooksLoaded = true;
				}
			}
		);

	}

	loadMoreBooks() {

		this.bookService.loadNextPage(_.last(this.books).key).subscribe(
			books => {
				const loadedBooks = _.reverse(_.cloneDeep(books));
				for (const book of loadedBooks) {
					this.books.push(book);
				}
				if (books.length === 0 || this.books.length % BOOKS_PAGE_SIZE !== 0) {
					this.allBooksLoaded = true;
				}
			}
		);

	}



}
