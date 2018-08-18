import {Routes} from '@angular/router';
import {Error404Component} from './error404/error404.component';
import {BooksComponent} from './books/books.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {SigninComponent} from './signin/signin.component';
import {SignedInGuard} from './shared/guards/signedIn.guard';
import {ProjectsListComponent} from './projects/projects-list/projects-list.component';
import {HomeComponent} from './home/home.component';
import {ProjectComponent} from './projects/project/project.component';
import {TutorialsListComponent} from './tutorials/tutorials-list/tutorials-list.component';
import {TutorialComponent} from './tutorials/tutorial/tutorial.component';
import {ProjectTestComponent} from './projects/project-test/project-test.component';
import {TutorialTestComponent} from './tutorials/tutorial-test/tutorial-test.component';
import {ResumeComponent} from './extras/resume/resume.component';
import {ExperienceListComponent} from './experience/experience-list/experience-list.component';

export const routes: Routes = [

	{
		path: 'project',
		children: [
			{
				path: 'test',
				component: ProjectTestComponent,
				canActivate: [AuthGuard]
			},
			{
				path: ':projectName',
				component: ProjectComponent
			}
		]
	},
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: '',
				redirectTo: 'projects_list',
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
				path: 'experience_list',
				component: ExperienceListComponent
			},
			{
				path: 'projects_list',
				component: ProjectsListComponent
			},
			{
				path: 'tutorials_list',
				component: TutorialsListComponent
			},
			{
				path: 'tutorial',
				children: [
					{
						path: 'test',
						component: TutorialTestComponent,
						canActivate: [AuthGuard]
					},
					{
						path: ':tutorialName',
						component: TutorialComponent
					}
				]
			},
			{
				path: 'resume',
				component: ResumeComponent
			}
		]
	},
	{
		path: '**',
		component: Error404Component
	}

];
