import {Action} from '@ngrx/store';

import {Note} from '../note.model';
import {State} from './note.reducers';

export const ADD_NOTE = 'ADD_NOTE';
export const TRY_ADD_NOTE = 'TRY_ADD_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';
export const TRY_EDIT_NOTE = 'TRY_EDIT_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';
export const TRY_REMOVE_NOTE = 'TRY_REMOVE_NOTE';
export const GET_NOTES = 'GET_NOTES';

export class AddNote implements Action {
	readonly type = ADD_NOTE;
	constructor(public payload:Note){}
}

export class TryAddNote implements Action {
	readonly type = TRY_ADD_NOTE;
	constructor(public payload:Note){}
}

export class EditNote implements Action {
	readonly type = EDIT_NOTE;
	constructor(public payload:{index: number, note: Note, id: string}){}
}

export class TryEditNote implements Action {
	readonly type = TRY_EDIT_NOTE;
	constructor(public payload:{index: number, note: Note, id: string}){}
}

export class RemoveNote implements Action {
	readonly type = REMOVE_NOTE;
	constructor(public payload: string){}
}

export class TryRemoveNote implements Action {
	readonly type = TRY_REMOVE_NOTE;
	constructor(public payload: string){}
}

export class GetNotes implements Action {
	readonly type = GET_NOTES;
	constructor(public payload: State){}
}

export type NoteActions = AddNote | EditNote | RemoveNote | GetNotes