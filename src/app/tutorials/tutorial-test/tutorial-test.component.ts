import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'tutorial-test',
	templateUrl: './tutorial-test.component.html',
	styleUrls: ['./tutorial-test.component.css']
})
export class TutorialTestComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
	}

	back() {
		this.router.navigate(['/', 'tutorials_list']);
	}

}
