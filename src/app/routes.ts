import {Routes} from '@angular/router';
import {Error404Component} from './error404/error404.component';
import {HomeComponent} from './home/home.component';
import {BooksComponent} from './books/books.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninComponent} from './signin/signin.component';
import {SignedInGuard} from './shared/guards/signedIn.guard';

export const routes: Routes = [

	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full'
	},
	{
		path: 'books',
		component: BooksComponent
	},
	{
		path: 'admin',
		component: SigninComponent,
		canActivate: [SignedInGuard]
	},
	{
		path: 'adminPanel',
		component: AdminComponent,
		canActivate: [AuthGuard]
	},
	{
		path: '**',
		component: Error404Component
	}

];
