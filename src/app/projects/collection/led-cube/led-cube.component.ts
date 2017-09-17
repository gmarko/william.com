import {Component, OnInit} from '@angular/core';
declare const jQuery: any;

@Component({
	selector: 'led-cube',
	templateUrl: './led-cube.component.html',
	styleUrls: ['./led-cube.component.css']
})
export class LedCubeComponent implements OnInit {

	constructor(
	) { }

	ngOnInit() {
		jQuery(document).ready(function(){

			jQuery('.toc-wrapper').pushpin({
				top: 400
			});

			jQuery('.scrollspy').scrollSpy();
		});

	}

}
