import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {AppComponent} from './app.component';
import {AuthService} from './auth/auth.service';

import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule} from './core/core.module';
import {NoteModule} from './notes/note.module';

import {reducers} from './store/app.reducer';
import {AuthEffects} from './auth/store/auth.effects';
import {NoteEffects} from './notes/store/note.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    CoreModule,
    NoteModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, NoteEffects])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
