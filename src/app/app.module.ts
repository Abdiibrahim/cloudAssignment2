import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { UploadComponent } from './upload/upload.component';
import * as firebase from 'firebase';
import { ImagesComponent } from './images/images.component';
import { AngularFireModule } from '@angular/fire';
import { HttpModule } from '@angular/http';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { TweetsComponent } from './tweets/tweets.component';

firebase.initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    ImagesComponent,
    ImageDetailComponent,
    TweetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
