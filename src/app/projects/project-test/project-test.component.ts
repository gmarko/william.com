import { Component, OnInit } from '@angular/core';
declare const jQuery: any;

@Component({
	selector: 'project-test',
	templateUrl: './project-test.component.html',
	styleUrls: ['./project-test.component.css']
})
export class ProjectTestComponent implements OnInit {

	constructor() { }

	ngOnInit() {

		jQuery(document).ready(function () {

			jQuery('.toc-wrapper').pushpin({
				top: 400
			});

			jQuery('.scrollspy').scrollSpy();
		});

	}

}
