import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
declare const Materialize: any;

export const SUCCESS_TOAST = 'SUCCESS_TOAST';
export const WARNING_TOAST = 'WARNING_TOAST';
export const ERROR_TOAST = 'ERROR_TOAST';

@Injectable()
export class ToastService {

	showToast(type: string, message: string) {

		switch (type) {

			case SUCCESS_TOAST:
				Materialize.toast(message || '', 1000, 'success-toast');
				break;

			case WARNING_TOAST:
				Materialize.toast(message || '', 1000, 'warning-toast');
				break;

			case ERROR_TOAST:
				Materialize.toast(message || '', 1000, 'error-toast');
				break;

		}


		return Observable.empty();
	}

}
