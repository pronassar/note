import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {NoteManageComponent} from './manage/note-manage/note-manage.component';
import {NoteEditComponent} from './manage/note-edit/note-edit.component';
import {NoteDisplayComponent} from './manage/note-display/note-display.component';
import {ManageComponent} from './manage/manage.component';
import {AuthGuard} from '../auth/auth.guard';

const routes: Routes = [
	{path: 'manage', component: ManageComponent, canActivateChild: [AuthGuard], children: [
		{path: '', component: NoteManageComponent},
		{path: 'edit', component: NoteEditComponent, data: {breadcrumb: "add new"}},
		{path: 'edit/:id', component: NoteEditComponent},
		{path: 'note/:id', component: NoteDisplayComponent},
	]}
]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NoteRoutingModule {}