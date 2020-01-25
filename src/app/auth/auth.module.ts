import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	declarations: [LoginComponent, SignupComponent],
	imports: [AuthRoutingModule, SharedModule, FormsModule],
})
export class AuthModule {

}