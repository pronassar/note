import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import {NoteService} from '../../note.service';
import {Note} from '../../note.model';
import * as NoteActions from '../../store/note.actions';



@Component({
	selector: 'app-note-manage',
	templateUrl: './note-manage.component.html',
	styles: ['tbody .btn {min-width: 83px}']
})
export class NoteManageComponent implements OnInit {

	notesState: Observable<{notes: Note[]}>;
	notesLength = 0;

	constructor(private noteService: NoteService, 
				private router: Router,
				private route: ActivatedRoute,
				private store: Store<{notes: {notes: Note[]}}>){}

	ngOnInit(){
		this.notesState = this.store.select('notes').pipe(
			map(notes => {
				this.notesLength = notes.notes.length;
				return notes;
			})
		)
	}

	onRemove(id:string){
		this.store.dispatch(new NoteActions.TryRemoveNote(id));
	}

	onEdit(index, title){
		this.router.navigate(["edit", index], {relativeTo: this.route, queryParams: {title}});
	}

	onBrowse(index, title){
		this.router.navigate(['note', index], {relativeTo: this.route, queryParams: {title}});
	}

	onAdd() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}
}