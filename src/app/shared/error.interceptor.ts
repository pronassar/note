import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {AppState} from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

export class ErrorInterceptor implements HttpInterceptor {

	constructor(private store: Store<AppState>){}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
		return next.handle(req).pipe(
			catchError(err => {
				//if 401 Unauthorized
				if(err.status === 401){
					this.store.dispatch(new AuthActions.Logout());
					location.reload(true);
				}
				const error = err.error.message || err.statusText;
				return throwError(error);
			})
		);
	}
}