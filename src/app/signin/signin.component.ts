import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {ERROR_TOAST, SUCCESS_TOAST, ToastService} from '../services/toast.service';

@Component({
	selector: 'signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	loginForm: FormGroup;

	constructor(
		private fb: FormBuilder,
	    private router: Router,
	    private auth: AngularFireAuth,
	    private toastService: ToastService
	) {
		this.loginForm = this.fb.group({
			email: ['william2958@gmail.com', Validators.required],
			password: ['ethoslab', Validators.required]
		});
	}

	ngOnInit() {
	}

	login() {
		const email = this.loginForm.value.email;
		const password = this.loginForm.value.password;

		this.auth.auth.signInWithEmailAndPassword(email, password).then(res => {
			this.toastService.showToast(SUCCESS_TOAST, 'Admin Signed In!');
			this.router.navigate(['/', 'adminPanel']);
		}).catch(err => {
			this.toastService.showToast(ERROR_TOAST, 'Sign In Failed');
		});
	}

}
