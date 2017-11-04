import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PROJECTS_PAGE_SIZE, ProjectService} from '../../services/project.service';
import * as _ from 'lodash';
import {SUCCESS_TOAST, ToastService} from '../../services/toast.service';

@Component({
	selector: 'projects',
	templateUrl: './projects-list.component.html',
	styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

	projects: any[];
	allProjectsLoaded = false;

	constructor(
		private router: Router,
		private projectService: ProjectService,
		private toastService: ToastService
	) { }

	ngOnInit() {

		this.projectService.getInitialProjects().subscribe(projects => {
			if (projects && projects.length > 0) {
				this.projects = projects;
				if (this.projects.length < PROJECTS_PAGE_SIZE) {
					this.allProjectsLoaded = true;
				}
				// Just needs to be reversed the first time.
				this.projects = _.reverse(this.projects);
			}
		});

	}

	loadMoreProjects() {

		this.projectService.loadNextPage(_.last(this.projects).date_added).subscribe(
			projects => {
				const loadedProjects = _.cloneDeep(projects);
				for (const project of loadedProjects) {
					this.projects.push(project);
				}
				if (projects.length === 0 || this.projects.length % PROJECTS_PAGE_SIZE !== 0) {
					this.allProjectsLoaded = true;
					this.toastService.showToast(SUCCESS_TOAST, 'All projects loaded!');
				}
			}
		);

	}

	goToProject(project) {
		this.router.navigate(['/', 'project', project.routerLink]);
	}

	goToWebsite(website) {
		window.open(website, '_blank');
	}

}
