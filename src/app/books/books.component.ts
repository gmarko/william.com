import {Component, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {Book} from '../shared/models/book';
import * as _ from 'lodash';

@Component({
	selector: 'books',
	templateUrl: './books.component.html',
	styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

	books: Book[];

	constructor(
		private bookService: BookService
	) { }

	ngOnInit() {

		this.bookService.getBooks().subscribe(
			books => {
				console.log('books recieved: ', books);
				this.books = _.cloneDeep(books);
			}
		);

	}



}
