import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
declare const jQuery: any;

@Component({
	selector: 'tutorial',
	templateUrl: './tutorial.component.html',
	styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

	tutorialName: string;
	tutorial: any;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private db: AngularFireDatabase
	) { }

	ngOnInit() {
		this.tutorialName = this.route.snapshot.params['tutorialName'];
		this.db.object('tutorial/' + this.tutorialName).subscribe(tutorial => {
			if (tutorial && tutorial.title) {
				this.tutorial = tutorial;
				jQuery(document).ready(function () {

					jQuery('.toc-wrapper').pushpin({
						top: 400
					});

					jQuery('.scrollspy').scrollSpy();
				});
			}
		});
	}

	back() {
		this.router.navigate(['/', 'tutorials_list']);
	}

}
