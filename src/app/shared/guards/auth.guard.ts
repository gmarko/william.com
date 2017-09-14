import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor (
		private auth: AngularFireAuth,
	    private router: Router
	) { }

	canActivate() {

		return this.auth.authState.map((auth) => {
			if (auth) {
				return true;
			} else {
				this.router.navigate(['/']);
				return false;
			}
		}).first();

	}

}
