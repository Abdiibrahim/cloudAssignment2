import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ImagesComponent } from './images/images.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { TweetsComponent } from './tweets/tweets.component';

const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'imageDetail/:img', component: ImageDetailComponent },
  { path: 'tweets', component: TweetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
