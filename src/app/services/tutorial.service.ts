import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListFactoryOpts} from 'angularfire2/database/interfaces';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {Subject} from 'rxjs/Subject';

export const TUTORIALS_PAGE_SIZE = 10;

@Injectable()
export class TutorialService {

	constructor(
		private db: AngularFireDatabase
	) { }

	getInitialTutorials() {

		return this.findTutorials({
			query: {
				orderByChild: 'date_added',
				limitToLast: TUTORIALS_PAGE_SIZE
			}
		});

	}

	loadNextPage(currentTutorial: string) {

		return this.findTutorials({
			query: {
				orderByChild: 'date_added',
				endAt: currentTutorial,
				limitToLast: TUTORIALS_PAGE_SIZE + 1
			}
		}).map(
			tutorials => tutorials.slice(0, tutorials.length - 1)
		);

	}

	findTutorials(query: FirebaseListFactoryOpts = {}): Observable<string[]> {
		return this.db.list('tutorials', query)
			.map(tutorials => {
				return tutorials.map(tutorial => {
					tutorial.key = tutorial.$key;
					return tutorial;
				});
			});
	}

	createTutorial(tutorialDetails) {

		const dataToSave = {};

		dataToSave['tutorials/' + tutorialDetails.routerLink] = {
			title: tutorialDetails.title,
			date_added: firebase.database.ServerValue.TIMESTAMP,
			routerLink: tutorialDetails.routerLink,
			short_description: tutorialDetails.short_description,
			category: tutorialDetails.category
		};

		dataToSave['tutorial/' + tutorialDetails.routerLink] = {
			title: tutorialDetails.title,
			date_added: firebase.database.ServerValue.TIMESTAMP,
			html: tutorialDetails.html,
			category: tutorialDetails.category
		};

		return this.firebaseUpdate(dataToSave);

	}

	updateTutorial(tutorialDetails) {

		const dataToSave = {};

		dataToSave['tutorial/' + tutorialDetails.routerLink + '/html'] = tutorialDetails.html;

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
