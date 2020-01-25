import {Note} from '../note.model';
import * as NotActions from './note.actions';

export interface State {
	notes: Note[]
}

const initialState: State = {
	notes: [
		new Note('title', 'desc')
	]
}

export function noteReducer(state = initialState, action: NotActions.NoteActions){
	let allNotes = [...state.notes]
	switch(action.type){
		case NotActions.GET_NOTES:
			return {...state, ...action.payload};

		case NotActions.ADD_NOTE:
			return {...state, notes:[...state.notes, action.payload]};

		case NotActions.EDIT_NOTE:
			let getNote = allNotes[action.payload.index],
				updateNote:any = {...getNote, ...action.payload.note};
			allNotes[action.payload.index] = updateNote
			return {...state, notes:[...allNotes]};

		case NotActions.REMOVE_NOTE:
			allNotes = [...state.notes];
			let afterRemoved = allNotes.filter((item:any) => item.id != action.payload);
			return {...state, notes: afterRemoved};

		default:
			return state;
	}
}