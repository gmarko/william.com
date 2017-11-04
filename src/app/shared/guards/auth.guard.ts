import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {ERROR_TOAST, ToastService} from '../../services/toast.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor (
		private auth: AngularFireAuth,
	    private toastService: ToastService,
	    private router: Router
	) { }

	canActivate() {

		return this.auth.authState.map((auth) => {
			if (auth) {
				return true;
			} else {
				this.toastService.showToast(ERROR_TOAST, 'Not Authorized!');
				this.router.navigate(['/']);
				return false;
			}
		}).first();

	}

}
