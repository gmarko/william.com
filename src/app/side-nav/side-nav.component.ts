import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

	constructor(
	) { }

	ngOnInit() {
	}

	goToTwitter() {
		window.open('https://twitter.com/will_huangg', '_blank');
	}
	goToLinkedIn() {
		window.open('https://www.linkedin.com/in/william-h-902213139/', '_blank');
	}
	goToGithub() {
		window.open('https://github.com/william2958', '_blank');
	}
	goToMedium() {
		window.open('https://medium.com/@william2958', '_blank');
	}

}
