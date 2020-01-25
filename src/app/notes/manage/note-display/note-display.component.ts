import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';

import{NoteService} from '../../note.service';
import {Note} from '../../note.model';

@Component({
	selector: 'app-note-display',
	templateUrl: './note-display.component.html'
})
export class NoteDisplayComponent implements OnInit {

	currentIndex: number;
	note:Observable<any>;

	constructor(private aRoute: ActivatedRoute, 
		private router: Router,
		private noteService: NoteService,
		private store: Store<{notes: {notes: Note[]}}>){}

	ngOnInit(){
		this.currentIndex = +this.aRoute.snapshot.paramMap.get('id');
		this.note = this.store.select('notes').pipe(map(items => items.notes[this.currentIndex]));
	}


}