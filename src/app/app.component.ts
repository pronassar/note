import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {trigger, state, style, transition, animate, query, group} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("fade", [
      transition("* => *", [
        group([
          query(':leave', [
            style({opacity: 1}),
            animate(100, style({opacity: 0}))
          ], { optional: true }),
          query(':enter', [
            style({opacity: 0}),
            animate(300, style({opacity: 1}))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'note';

  ngOnInit (){
  	firebase.initializeApp({
  		apiKey: 'AIzaSyAzArFhwjb3KtjY5d0ANnip3CZxM33rXg8',
  		authDomain: 'https://note-534b6.firebaseio.com'
  	})
  }

}
