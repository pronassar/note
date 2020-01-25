import {Effect, Actions, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {defer, of} from 'rxjs';
import {switchMap, map, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http'

import {AppState} from '../../store/app.reducer'
import * as NoteActons from './note.actions';
import * as AuthActions from '../../auth/store/auth.actions';
import {Note} from '../note.model';

export class NoteEffects {

	constructor(
		private actions$: Actions, 
		private http: HttpClient, 
		private store: Store<AppState>
		){}

	@Effect() getNotesOnInit$ = defer(() => this.getNotes());
	@Effect() getNotesOnSignup$ = this.actions$.pipe(ofType(AuthActions.SIGNUP), switchMap(() => this.getNotes()));
	@Effect() getNotesOnLogin$ = this.actions$.pipe(ofType(AuthActions.LOGIN), switchMap(() => this.getNotes()));

	@Effect() addNote$ = this.actions$
		.pipe(
			ofType(NoteActons.TRY_ADD_NOTE),
			switchMap((action: NoteActons.AddNote) => {
				return this.http.post('https://note-534b6.firebaseio.com/data.json', action.payload)
					.pipe( map((data:any) => {
						let x = {...action.payload};
						x['id'] = data.name
						 return x;
					}) );
			}),
			switchMap((act:any) => {
				return of(new NoteActons.AddNote(act));
			})
		);

	@Effect() removeNote$ = this.actions$
		.pipe(
			ofType(NoteActons.TRY_REMOVE_NOTE),
			switchMap((action: NoteActons.TryRemoveNote) => {
				return this.http.delete(`https://note-534b6.firebaseio.com/data/${action.payload}.json`)
					.pipe( map(() => action) );
			}),
			switchMap(act => of( new NoteActons.RemoveNote(act.payload) ))
		);

	@Effect() editNote$ = this.actions$
		.pipe(
			ofType(NoteActons.TRY_EDIT_NOTE),
			switchMap((action: NoteActons.TryEditNote) => {
				return this.http.put(`https://note-534b6.firebaseio.com/data/${action.payload.id}.json`, action.payload.note)
					.pipe( map(() => action) );
			}),
			switchMap( act => of(new NoteActons.EditNote(act.payload)) )
		);

	getNotes(){
		return this.store.select('auth')
			.pipe(
				take(1),
				switchMap(authState => {
					if( authState.authenticated ){
						return this.http.get('https://note-534b6.firebaseio.com/data.json')
							.pipe(
								map(data => this.objToArray(data) ),
								switchMap(items => of(new NoteActons.GetNotes( {notes: items})) )
							)
					}else{
						return of(new NoteActons.GetNotes(null))
					}
				})
			)
	}

	objToArray(obj){
		let output = [];
		if(obj){
			Object.keys(obj).map(id => {
				obj[id]['id'] = id;
				output.push(obj[id]);
			})
		}
		return output;
	}

}