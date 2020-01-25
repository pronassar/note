import {CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {AppState} from '../store/app.reducer';
import {AuthService} from '../auth/auth.service';
import * as fromAuth from './store/auth.reducer';

export class AuthGuard implements CanActivate, CanActivateChild {
	constructor(
		private authServ: AuthService, 
		private router: Router,
		private store: Store<AppState>
		){}
	canActivate(route: ActivatedRouteSnapshot, 
				state: RouterStateSnapshot
				) : Observable<boolean> | Promise<boolean> | boolean {

		return this.store.select('auth').pipe(take(1) ,switchMap((result:fromAuth.State) => {
			if(!result.authenticated){
				this.router.navigate(['login']);
			}else{
				return of(result.authenticated);
			}
		}))
		
	}
	canActivateChild(
		route: ActivatedRouteSnapshot, 
		state: RouterStateSnapshot
		):Observable<boolean> | Promise<boolean> | boolean {
		return this.canActivate(route, state);
	}
}