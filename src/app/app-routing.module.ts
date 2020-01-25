import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './core/home/home.component';

@NgModule({
	imports: [RouterModule.forRoot([
		{path: '', component: HomeComponent},
		{path: '**', redirectTo: ''}
	], {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule {}