import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {MaterializeModule} from 'angular2-materialize';
import {AngularFireModule} from 'angularfire2';
import {RouterModule} from '@angular/router';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { Error404Component } from './error404/error404.component';
import {routes} from './routes';
import {firebaseConfig} from '../environments/firebase.config';
import { SideNavComponent } from './side-nav/side-nav.component';
import { BooksComponent } from './books/books.component';
import {BookService} from './services/book.service';
import {ToastService} from './services/toast.service';
import { AdminComponent } from './admin/admin.component';
import {AuthGuard} from './shared/guards/auth.guard';
import { SigninComponent } from './signin/signin.component';
import {SignedInGuard} from './shared/guards/signedIn.guard';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { HomeComponent } from './home/home.component';
import { LedCubeComponent } from './projects/collection/led-cube/led-cube.component';
import { ProjectComponent } from './projects/project/project.component';
import { TutorialsListComponent } from './tutorials/tutorials-list/tutorials-list.component';
import {BitAngleModulationComponent} from './tutorials/collection/bit-angle-modulation/bit-angle-modulation.component';

@NgModule({
	declarations: [
		AppComponent,
		Error404Component,
		SideNavComponent,
		BooksComponent,
		AdminComponent,
		SigninComponent,
		ProjectsListComponent,
		HomeComponent,
		LedCubeComponent,
		ProjectComponent,
		TutorialsListComponent,
		BitAngleModulationComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		MaterializeModule,
		RouterModule.forRoot(routes),
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireDatabaseModule,
		AngularFireAuthModule
	],
	providers: [
		ToastService,
		BookService,
		AuthGuard,
		SignedInGuard
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
