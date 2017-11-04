import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
declare const jQuery: any;

@Component({
	selector: 'project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	projectName: string;
	project: any;

	constructor(
		private route: ActivatedRoute,
		private db: AngularFireDatabase
	) { }

	ngOnInit() {
		this.projectName = this.route.snapshot.params['projectName'];
		this.db.object('project/' + this.projectName).subscribe(project => {
			if (project.title) {
				this.project = project;
				jQuery(document).ready(function () {

					jQuery('.toc-wrapper').pushpin({
						top: 400
					});

					jQuery('.scrollspy').scrollSpy();
				});
			}
		});

	}

	sidenavActions = new EventEmitter<any>();

	shownav() {
		this.sidenavActions.emit({action: "sideNav", params: ['show']});
	}

}
