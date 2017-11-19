import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListFactoryOpts} from 'angularfire2/database/interfaces';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';

export const PROJECTS_PAGE_SIZE = 8;

@Injectable()
export class ProjectService {

	constructor (
		private db: AngularFireDatabase
	) { }

	getInitialProjects() {

		return this.findProjects({
			query: {
				orderByChild: 'date_added',
				limitToLast: PROJECTS_PAGE_SIZE
			}
		});

	}

	loadNextPage(currentProject: string) {

		return this.findProjects({
			query: {
				orderByChild: 'date_added',
				endAt: currentProject,
				limitToLast: PROJECTS_PAGE_SIZE + 1
			}
		}).map(
			projects => projects.slice(0, projects.length - 1)
		);

	}

	findProjects(query: FirebaseListFactoryOpts = {}): Observable<string[]> {
		return this.db.list('projects', query)
			.map(projects => {
				return projects.map(project => {
					project.key = project.$key;
					return project;
				});
			});
	}

	createProject(projectDetails) {

		const dataToSave = {};

		dataToSave['projects/' + projectDetails.routerLink] = {
			cover_image: projectDetails.cover_image,
			date_added: firebase.database.ServerValue.TIMESTAMP,
			date_completed: projectDetails.date_completed,
			routerLink: projectDetails.routerLink,
			short_description: projectDetails.short_description,
			title: projectDetails.title,
			category: projectDetails.category,
			stack: projectDetails.stack,
			live: projectDetails.live
		};

		dataToSave['project/' + projectDetails.routerLink] = {
			date_completed: projectDetails.date_completed,
			html: projectDetails.html,
			title: projectDetails.title,
			category: projectDetails.category
		};

		return this.firebaseUpdate(dataToSave);

	}

	updateProject(projectDetails) {

		const dataToSave = {};

		dataToSave['project/' + projectDetails.routerLink + '/html'] = projectDetails.html;

		return this.firebaseUpdate(dataToSave);

	}

	firebaseUpdate(dataToSave) {

		const subject = new Subject();

		this.db.database.ref().update(dataToSave)
			.then(
				val => {
					subject.next(val);
					subject.complete();
				},
				err => {
					subject.error(err);
					subject.complete();
				}
			);

		return subject.asObservable();

	}

}
