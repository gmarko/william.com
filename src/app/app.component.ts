import {Component, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	sidenavActions = new EventEmitter<any>();

	shownav() {
		this.sidenavActions.emit({action: "sideNav", params: ['show']});
	}

}
