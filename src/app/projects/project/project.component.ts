import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
	selector: 'project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

	constructor() { }

	ngOnInit() {

	}

	sidenavActions = new EventEmitter<any>();

	shownav() {
		this.sidenavActions.emit({action: "sideNav", params: ['show']});
	}

}
