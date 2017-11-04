import {Component, ElementRef, OnInit} from '@angular/core';
import {BookService} from '../services/book.service';
import {ERROR_TOAST, SUCCESS_TOAST, ToastService} from '../services/toast.service';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../services/project.service';
import {TutorialService} from '../services/tutorial.service';

@Component({
	selector: 'admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

	createProjectForm: FormGroup;
	createTutorialForm: FormGroup;
	createBookForm: FormGroup;

	editProjectForm: FormGroup;
	editTutorialForm: FormGroup;

	bookImage;
	bookRecommended = false;

	constructor(
		private element: ElementRef,
		private projectService: ProjectService,
		private tutorialService: TutorialService,
		private bookService: BookService,
		private toastService: ToastService,
	    private auth: AngularFireAuth,
	    private router: Router,
	    private fb: FormBuilder
	) {

		this.createProjectForm = this.fb.group({
			title: ['', Validators.required],
			date_completed: ['', Validators.required],
			cover_image: ['', Validators.required],
			category: ['', Validators.required],
			routerLink: ['', Validators.required],
			short_description: ['', Validators.required],
			html: ['', Validators.required]
		});

		this.editProjectForm = this.fb.group({
			html: [''],
			routerLink: ['', Validators.required]
		});

		this.createTutorialForm = this.fb.group({
			title: ['', Validators.required],
			routerLink: ['', Validators.required],
			category: ['', Validators.required],
			short_description: ['', Validators.required],
			html: ['', Validators.required]
		});

		this.editTutorialForm = this.fb.group({
			html: [''],
			routerLink: ['', Validators.required]
		});

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

	createProject() {
		if (this.createProjectForm.valid) {
			this.projectService.createProject(this.createProjectForm.value).subscribe(() => {
				this.toastService.showToast(SUCCESS_TOAST, 'Project successfully created!');
			});
			this.createProjectForm.reset();
		} else {
			this.toastService.showToast(ERROR_TOAST, 'Project Form not complete!');
		}
	}

	updateProject() {
		if (this.editProjectForm.valid) {
			this.projectService.updateProject(this.editProjectForm.value).subscribe(() => {
				this.toastService.showToast(SUCCESS_TOAST, 'Project successfully updated!');
			});
			this.editProjectForm.reset();
		} else {
			this.toastService.showToast(ERROR_TOAST, 'Update Project Form not complete!');
		}
	}

	createTutorial() {
		if (this.createTutorialForm.valid) {
			this.tutorialService.createTutorial(this.createTutorialForm.value).subscribe(() => {
				this.toastService.showToast(SUCCESS_TOAST, 'Tutorial successfully created!');
			});
			this.createTutorialForm.reset();
		} else {
			this.toastService.showToast(ERROR_TOAST, 'Tutorial Form not complete!');
		}
	}

	updateTutorial() {
		if (this.editTutorialForm.valid) {
			this.tutorialService.updateTutorial(this.editTutorialForm.value).subscribe(() => {
				this.toastService.showToast(SUCCESS_TOAST, 'Tutorial successfully updated!');
			});
			this.editTutorialForm.reset();
		} else {
			this.toastService.showToast(ERROR_TOAST, 'Update Tutorial Form not complete!');
		}
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
			this.bookService.addBook(this.createBookForm.value, this.bookImage, this.bookRecommended);
			this.createBookForm.reset();
		} else {
			this.toastService.showToast(ERROR_TOAST, 'Book Form not complete!');
		}
	}

	logout() {
		this.auth.auth.signOut();
		this.router.navigate(['/']);
	}

}
