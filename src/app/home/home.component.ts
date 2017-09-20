import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	sidenavActions = new EventEmitter<any>();

	shownav() {
		this.sidenavActions.emit({action: "sideNav", params: ['show']});
	}

}
