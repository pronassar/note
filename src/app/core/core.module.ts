import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';

import {SharedModule} from '../shared/shared.module';
import {AuthInterceptor} from '../shared/auth.interceptor';
import {ErrorInterceptor} from '../shared/error.interceptor';


@NgModule({
	declarations: [
		HomeComponent, 
		HeaderComponent, 
		BreadcrumbComponent,
	],
	exports: [HeaderComponent],
	imports: [SharedModule, RouterModule, BrowserAnimationsModule],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
	]
})
export class CoreModule {

}