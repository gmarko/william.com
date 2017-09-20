import {Component, OnInit} from '@angular/core';
declare const jQuery: any;
import * as firebase from 'firebase';

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

	getCode() {
		window.open("https://firebasestorage.googleapis.com/v0/b/william-9ab03.appspot.com/o/projectImages%2Frgb_led_cube%2Fled_cube_code.ino?alt=media&token=ddb3b70e-ce17-44e2-9126-966cf91b076d");
	}

}
