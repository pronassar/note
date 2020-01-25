import {ActionReducerMap} from '@ngrx/store';
import {noteReducer} from '../notes/store/note.reducers';
import {authReducer} from '../auth/store/auth.reducer';
import * as fromNote from '../notes/store/note.reducers';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
	notes: fromNote.State,
	auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
	notes: noteReducer,
	auth: authReducer

}