import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'tutorials-list',
	templateUrl: './tutorials-list.component.html',
	styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
	}

	goToBAM() {
		this.router.navigate(['/', 'tutorial', 'bit_angle_modulation']);
	}

}
