import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NoteRoutingModule} from './note-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {ManageComponent} from './manage/manage.component';
import {NoteManageComponent} from './manage/note-manage/note-manage.component';
import {NoteEditComponent} from './manage/note-edit/note-edit.component';
import {NoteDisplayComponent} from './manage/note-display/note-display.component';

import {NoteService} from './note.service';
import {AuthGuard} from '../auth/auth.guard';

@NgModule({
	declarations: [
		ManageComponent,
		NoteManageComponent,
		NoteEditComponent,
		NoteDisplayComponent
	],
	imports: [
		SharedModule,
		NoteRoutingModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [NoteService, AuthGuard]
})
export class NoteModule {}