import {Note} from './note.model';
import {Observable, Subject, of} from 'rxjs';
import {map, tap, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../auth/auth.service';

export class NoteService {

	constructor(private http: HttpClient, private authServ: AuthService){}

	allNotes : Array<Note> = [
		new Note("hello", "this descripthion"),
		new Note("test", "this descripthion")
	]

	getNotes(){
		return this.http.get('https://note-534b6.firebaseio.com/data.json')
		.pipe(map(data => this.objToArray(data) ))
	}

	getNote(index){
		return	this.indexToId(index).pipe(switchMap(id => {
					return this.http.get(`https://note-534b6.firebaseio.com/data/${id}.json`)
				}))
	}

	removeNote(index){
		return	this.indexToId(index).pipe(switchMap(id => {
					return this.http.delete(`https://note-534b6.firebaseio.com/data/${id}.json`)
				}))
	}

	editNote(index, note){
		return	this.indexToId(index).pipe(switchMap(id => {
					return this.http.put(`https://note-534b6.firebaseio.com/data/${id}.json`, note)
				}))
	}


	addNote(note){
		return this.http.post('https://note-534b6.firebaseio.com/data.json', note);
	}

	objToArray(obj){
		let output = [];
		Object.keys(obj).map(id => {
			obj[id]['id'] = id;
			output.push(obj[id]);
		})
		return output;
	}

	indexToId(index){
		return this.getNotes().pipe(map(items => items[index].id));
	}

}