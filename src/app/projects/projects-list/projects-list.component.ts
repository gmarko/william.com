import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'projects',
	templateUrl: './projects-list.component.html',
	styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
	}

	goToLEDCube() {
		this.router.navigate(['/', 'project', 'led_cube']);
	}

}
