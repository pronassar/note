import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

import {NoteService} from '../../note.service';
import {Note} from '../../note.model';
import * as NoteActions from '../../store/note.actions';
 

@Component({
	selector: 'app-edit-manage',
	templateUrl: './note-edit.component.html'
})
export class NoteEditComponent implements OnInit {

	editForm: FormGroup;
	currentNote : any;
	currentIndex: number;
	currentId: string;
	editId: string;

	constructor(private aRoute: ActivatedRoute, 
				private noteService: NoteService, 
				private router: Router,
				private store: Store<{notes: {notes: Note[]}}>){}

	ngOnInit(){

		this.editForm = new FormGroup({
			'title': new FormControl(),
			'desc': new FormControl()
		})
		this.currentId = this.aRoute.snapshot.paramMap.get('id')
		this.currentIndex = +this.currentId;
		if(this.currentId){
			this.store.select('notes').pipe(map(items => items.notes[this.currentIndex]))
				.subscribe((item:any) => {
					this.editId = item && item.id;
					this.editForm.setValue({
						'title': item.title, 
						'desc': item.desc
					})
				})
		}

	}

	onSubmit(){
		if(this.currentId){
			this.onEdit();
		}else{
			this.onAdd()
		}
	}

	onEdit(){
		this.store.dispatch(new NoteActions.TryEditNote({index: this.currentIndex, note: this.editForm.value, id: this.editId}));
		this.router.navigate(['../../'], {relativeTo: this.aRoute});
	}

	onAdd(){
		this.store.dispatch({type: 'TRY_ADD_NOTE', payload: this.editForm.value});
		this.router.navigate(['/manage'])
	}
}