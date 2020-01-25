import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';

import {AuthService} from '../auth.service';
import {AppState} from '../../store/app.reducer';
import * as authActions from '../../auth/store/auth.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(
		private authServ: AuthService,
		private router: Router,
		private aRoute: ActivatedRoute,
		private store: Store<AppState>
	){}

	ngOnInit(){}

	onSubmit(form:NgForm){
		form.disabled;
		let val: {email: string, password: string} = form.value;
		this.store.dispatch(new authActions.TryLogin({email:val.email, password: val.password}));
	}
}