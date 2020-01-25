import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {AppState} from '../store/app.reducer';

export class AuthInterceptor implements HttpInterceptor {

	constructor(private store: Store<AppState>){}

	intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>{
		return this.store.select('auth').pipe(
					take(1),
					map(data => data.token),
					switchMap(token => {
						const copiedReq = req.clone({params: req.params.set("auth", token)});
						return next.handle(copiedReq).pipe(map(data => {
							//detect the response
							if(data.type === HttpEventType.Response){
								//console.log(data);
							}
							return data;
						}))
					})
				)
		

	}
}