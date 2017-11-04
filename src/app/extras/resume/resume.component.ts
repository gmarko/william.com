import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {firebaseConfig} from '../../../environments/firebase.config';

@Component({
	selector: 'resume',
	templateUrl: './resume.component.html',
	styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

	generalResumeDownloadUrl: string;
	developerResumeDownloadUrl: string;

	constructor() { }

	ngOnInit() {

		firebase.initializeApp(firebaseConfig);

		const storageRef = firebase.storage().ref();
		const generalResumeRef = storageRef.child('resume/general_resume.pdf');
		const developerResumeRef = storageRef.child('resume/developer_resume.pdf');
		generalResumeRef.getDownloadURL().then(url => this.generalResumeDownloadUrl = url);
		developerResumeRef.getDownloadURL().then(url => this.developerResumeDownloadUrl = url);
	}

}
