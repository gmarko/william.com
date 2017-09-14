import {Component, ElementRef, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ERROR_TOAST, ToastService} from '../services/toast.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	bookImage;
	bookDetails;

	constructor(
		private element: ElementRef,
		private bookService: BookService,
		private toastService: ToastService,
	    private auth: AngularFireAuth,
	    private router: Router
	) { }

	ngOnInit() {
	}

	changeListener(event) {
		const reader = new FileReader();
		const image = this.element.nativeElement.querySelector('.image');

		reader.onload = function(e) {
			const src = (<any>e.target).result;
			image.src = src;
		};

		reader.readAsDataURL(event.target.files[0]);
		this.bookImage = event.target.files[0];
	}

	uploadBook() {
		if (this.bookImage) {
			const book = {
				title: 'The dark knight',
				author: 'me',
				rating: '3.4',
				mediumLink: 'blahblah.com'
			};

			this.bookDetails = this.bookService.addBook(book, this.bookImage);
		} else {
			this.toastService.showToast(ERROR_TOAST, 'Must choose an image!');
		}
	}

	logout() {
		this.auth.auth.signOut();
		this.router.navigate(['/']);
	}

}
