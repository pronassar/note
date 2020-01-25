import {Action} from '@ngrx/store';
import {Note} from './note.model';

export const ADD_NOTE = 'ADD_NOTE';
export const REMOVE_NOTE = 'REMOVE_NOTE';

export class AddNoteAction implements Action {
	type = ADD_NOTE;

	constructor(private payload: Note){}
}

export class RemoveNoteAction implements Action {
	type = REMOVE_NOTE;

	constructor(payload: number){}
}

export type NoteActions = AddNoteAction | RemoveNoteAction