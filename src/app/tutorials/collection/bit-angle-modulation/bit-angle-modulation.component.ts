import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
	selector: 'bit-angle-modulation',
	templateUrl: './bit-angle-modulation.component.html',
	styleUrls: ['./bit-angle-modulation.component.css']
})
export class BitAngleModulationComponent implements OnInit {

	constructor(
		private router: Router
	) { }

	ngOnInit() {
	}

	back() {
		this.router.navigate(['/', 'tutorials']);
	}

}
