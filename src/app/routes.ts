import {Routes} from '@angular/router';
import {Error404Component} from './error404/error404.component';
import {BooksComponent} from './books/books.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninComponent} from './signin/signin.component';
import {SignedInGuard} from './shared/guards/signedIn.guard';
import {ProjectsListComponent} from './projects/projects-list/projects-list.component';
import {HomeComponent} from './home/home.component';
import {LedCubeComponent} from './projects/collection/led-cube/led-cube.component';
import {ProjectComponent} from './projects/project/project.component';
import {TutorialsListComponent} from './tutorials/tutorials-list/tutorials-list.component';
import {BitAngleModulationComponent} from './tutorials/collection/bit-angle-modulation/bit-angle-modulation.component';

export const routes: Routes = [

	{
		path: 'project',
		component: ProjectComponent,
		children: [
			{
				path: 'led_cube',
				component: LedCubeComponent
			}
		]
	},
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: '',
				redirectTo: 'books',
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
				path: 'projects',
				component: ProjectsListComponent
			},
			{
				path: 'tutorials',
				component: TutorialsListComponent
			},
			{
				path: 'tutorial',
				children: [
					{
						path: 'bit_angle_modulation',
						component: BitAngleModulationComponent
					}
				]
			}
		]
	},
	{
		path: '**',
		component: Error404Component
	}

];
