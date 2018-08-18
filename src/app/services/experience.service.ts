import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {FirebaseListFactoryOpts} from 'angularfire2/database/interfaces';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';

@Injectable()
export class ExperienceService {

	constructor (
		private db: AngularFireDatabase
	) { }

	getExperiences() {

		return this.findExperiences({
			query: {
				orderByChild: 'date_added'
			}
		});

	}

	findExperiences(query: FirebaseListFactoryOpts = {}): Observable<string[]> {
		return this.db.list('experiences', query)
			.map(experiences => {
				return experiences.map(experience => {
					experience.key = experience.$key;
					return experience;
				});
			});
	}

	createExperience(experienceDetails) {

		const dataToSave = {};

		dataToSave['experiences/' + experienceDetails.routerLink] = {
			date_added: firebase.database.ServerValue.TIMESTAMP,
			title: experienceDetails.title,
			routerLink: experienceDetails.routerLink,
			date_started: experienceDetails.date_started,
			date_ended: experienceDetails.date_ended,
			cover_image: experienceDetails.cover_image,
			short_description: experienceDetails.short_description,
		};

		dataToSave['experience/' + experienceDetails.routerLink] = {
			date_started: experienceDetails.date_started,
			date_ended: experienceDetails.date_ended,
			title: experienceDetails.title,
			html: experienceDetails.html
		};

		return this.firebaseUpdate(dataToSave);

	}

	updateExperience(experienceDetails) {

		const dataToSave = {};

		dataToSave['experience/' + experienceDetails.routerLink + '/html'] = experienceDetails.html;

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
