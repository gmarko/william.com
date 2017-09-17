import {Component, ElementRef, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ERROR_TOAST, ToastService} from '../services/toast.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	createBookForm: FormGroup;

	bookImage;
	bookDetails;

	constructor(
		private element: ElementRef,
		private bookService: BookService,
		private toastService: ToastService,
	    private auth: AngularFireAuth,
	    private router: Router,
	    private fb: FormBuilder
	) {
		this.createBookForm = this.fb.group({
			title: ['', Validators.required],
			author: ['', Validators.required],
			rating: ['', Validators.required],
			description: ['', Validators.required],
			mediumLink: ['', Validators.required]
		});
	}

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
		if (this.bookImage && this.createBookForm.valid) {
			this.bookDetails = this.bookService.addBook(this.createBookForm.value, this.bookImage);
			this.createBookForm.reset();
		} else {
			this.toastService.showToast(ERROR_TOAST, 'Form not complete!');
		}
	}

	logout() {
		this.auth.auth.signOut();
		this.router.navigate(['/']);
	}

}
