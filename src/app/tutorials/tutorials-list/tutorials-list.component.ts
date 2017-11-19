import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TUTORIALS_PAGE_SIZE, TutorialService} from '../../services/tutorial.service';
import {SUCCESS_TOAST, ToastService} from '../../services/toast.service';
import * as _ from 'lodash';

@Component({
	selector: 'tutorials-list',
	templateUrl: './tutorials-list.component.html',
	styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

	tutorials: any[];
	allTutorialsLoaded = false;

	constructor(
		private router: Router,
		private tutorialService: TutorialService,
		private toastService: ToastService
	) { }

	ngOnInit() {

		this.tutorialService.getInitialTutorials().subscribe(tutorials => {
			if (tutorials && tutorials.length > 0) {
				this.tutorials = tutorials;
				if (this.tutorials.length < TUTORIALS_PAGE_SIZE) {
					this.allTutorialsLoaded = true;
				}
				// Just needs to be reversed the first time.
				this.tutorials = _.reverse(this.tutorials);
			}
		});

	}

	loadMoreTutorials() {

		this.tutorialService.loadNextPage(_.last(this.tutorials).date_added).subscribe(
			tutorials => {
				const loadedTutorials = _.reverse(_.cloneDeep(tutorials));
				for (const tutorial of loadedTutorials) {
					this.tutorials.push(tutorial);
				}
				if (tutorials.length === 0 || this.tutorials.length % TUTORIALS_PAGE_SIZE !== 0) {
					this.allTutorialsLoaded = true;
					this.toastService.showToast(SUCCESS_TOAST, 'All tutorials loaded!');
				}
			}
		);

	}

	goToTutorial(tutorial) {
		this.router.navigate(['/', 'tutorial', tutorial.routerLink]);
	}

}
