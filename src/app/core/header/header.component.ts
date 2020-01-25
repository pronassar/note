import{Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router, Route} from '@angular/router';
import {Store} from '@ngrx/store';
import {trigger, style, state, transition, animate} from '@angular/animations'

import {AuthService} from '../../auth/auth.service';
import * as fromReducers from '../../store/app.reducer';
import * as authActions from '../../auth/store/auth.actions'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	animations: [trigger('collapse', [
		state('true', style({
			'height': '*'
		})),
		state('false', style({
			'height': 0
		})),
		transition("true <=> false", [
			animate('0.25s')
		])
	])]
})
export class HeaderComponent implements OnInit {

	authenticated:boolean = false;
	collapse:boolean = false;

	constructor(
		private authServ: AuthService,
		private router: Router,
		private store: Store<fromReducers.AppState>
	){}

	ngOnInit(){
		//this.authenticated = this.authServ.authenticated
		this.store.select('auth').subscribe(data=> this.authenticated = data.authenticated);
	}

	onLogout(){
		this.authServ.logout().then(data => {
			//this.authServ.authenticated = false;
			this.store.dispatch(new authActions.Logout());
			this.router.navigate(['']);
		})
	}

	onCollapse(){
		this.collapse = !this.collapse;
	}
}