import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import {AuthService} from '../auth.service';
import {AppState} from '../../store/app.reducer';
import * as authActions from '../store/auth.actions';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html'
})
export class SignupComponent {
	constructor(
		private authServ: AuthService, 
		private router: Router, 
		private aRoute: ActivatedRoute,
		private store: Store<AppState>
	){}

	ngOnInit(){}

	onSubmit(form:NgForm){
		let val: {email:string, password:string} = form.value;
		this.store.dispatch(new authActions.TrySignup({email:val.email, password: val.password}))
	}
}