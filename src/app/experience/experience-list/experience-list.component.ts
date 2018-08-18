import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ExperienceService} from '../../services/experience.service';
import * as _ from 'lodash';

@Component({
	selector: 'experience-list',
	templateUrl: './experience-list.component.html',
	styleUrls: ['./experience-list.component.css']
})
export class ExperienceListComponent implements OnInit {

	experiences: any[];

	constructor(
		private router: Router,
		private experienceService: ExperienceService
	) { }

	ngOnInit() {

		this.experienceService.getExperiences().subscribe(experiences => {
			if (experiences && experiences.length > 0) {
				this.experiences = experiences;
				this.experiences = _.reverse(this.experiences);
				console.log('EXPERIENCES: ', this.experiences);
			}
		});

	}

	goToExperience(experience) {
		this.router.navigate(['/', 'experience', experience.routerLink]);
	}

}
