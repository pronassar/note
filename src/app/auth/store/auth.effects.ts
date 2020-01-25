import {Effect, Actions, ofType} from '@ngrx/effects';
import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';
import {from, defer, of} from 'rxjs';
import {map, switchMap, mergeMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export class AuthEffects {
	constructor(private actions$: Actions, private router: Router){}

	@Effect() checkAuth$ = defer(this.checkAuth);

	@Effect() 
	signup = this.actions$.pipe(
		ofType(AuthActions.TRY_SIGNUP),
		switchMap((action: AuthActions.TrySignup) => {
			return from(firebase.auth()
				.createUserWithEmailAndPassword(action.payload.email, action.payload.password));
		}),
		switchMap(() => {
			return from(firebase.auth().currentUser.getIdToken());
		}),
		mergeMap(token => {
			localStorage.setItem('token', JSON.stringify(token));
			this.router.navigate(['/']);
			return [new AuthActions.SetToken(token), new AuthActions.Signup()];
		})
	);

	@Effect() 
	login = this.actions$.pipe(
		ofType(AuthActions.TRY_LOGIN),
		switchMap((action: AuthActions.TryLogin) => {
			return from(firebase.auth()
				.signInWithEmailAndPassword(action.payload.email, action.payload.password));
		}),
		switchMap(() => {
			return from(firebase.auth().currentUser.getIdToken());//.pipe(tap(data => console.log(data)));
		}),
		mergeMap(token => {
			localStorage.setItem('token', JSON.stringify(token));
			this.router.navigate(['/']);
			return [new AuthActions.SetToken(token), new AuthActions.Login()];
		})
	)

	checkAuth(){
		let token = JSON.parse(localStorage.getItem('token'));
		if (token){
			return of(null).pipe(
				mergeMap(() => {
					return [
						new AuthActions.Login(),
						new AuthActions.SetToken(token)
					]
				})
			)
		}else{
			return of(new AuthActions.Logout());
		}
		
	}


}