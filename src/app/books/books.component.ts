import {Component, OnInit} from '@angular/core';
import {BOOKS_PAGE_SIZE, BookService} from '../services/book.service';
import {Book} from '../shared/models/book';
import * as _ from 'lodash';
import {SUCCESS_TOAST, ToastService} from '../services/toast.service';

@Component({
	selector: 'books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

	books: Book[];
	allBooksLoaded = false;

	constructor(
		private bookService: BookService,
		private toastService: ToastService
	) { }

	ngOnInit() {

		this.bookService.getInitialBooks().subscribe(
			books => {
				this.books = _.reverse(_.cloneDeep(books));
				if (this.books.length < BOOKS_PAGE_SIZE) {
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
					this.toastService.showToast(SUCCESS_TOAST, 'All books loaded!');
				}
			}
		);

	}



}
