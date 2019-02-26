import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { visionAPI_URL, visionAPI_key, twilioSID, twilioToken } from '../../constants';
import { Headers, Http, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { ImageDetails } from '../_models/imageDetails';
import { Router } from '@angular/router';

declare var require: any;

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images: AngularFireList<any>;

  private _path = '/photos';

  constructor(private _angularFireDatabase: AngularFireDatabase,
              private _http: Http,
              private _router: Router) { }

  uploadImage(file: File) {
    const photoID: string = Guid.newGuid();
    const metaData = {'contentType': file.type};
    const storageRef: firebase.storage.Reference = firebase.storage().ref().child('/photos/' + photoID);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);

    console.log('uploading', file.name);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      uploadSnapshot.ref.getDownloadURL().then(function(downloadURL){
        firebase.database().ref('/photos/' + photoID).set(downloadURL);
      });
    });

    this._router.navigate(['/images/']);
  }

  getImages(): AngularFireList<any> {
    this.images = this._angularFireDatabase.list(this._path);
    return this.images;
  }

  analyzeImage(imageURL: string) {
    const headers = new Headers({
      'content-type': 'application/json',
      'Ocp-Apim-Subscription-Key': visionAPI_key
    });

    const params = {
      'visualFeatures': 'Categories,Description,Tags,Faces,Color',
      'details': 'Celebrities,Landmarks',
      'language': 'en'
    };

    const options = new RequestOptions({headers, params});

    return this._http.post(visionAPI_URL, {url: imageURL}, options).pipe(map(data => data.json()));
  }

  sendSMS(imageDetails: ImageDetails) {
    var message = JSON.stringify(imageDetails);

    var body = `To=+19057469407&From=+12897699472&Body=${message}`;

    const headers = new Headers({
      'Authorization': 'Basic ' + btoa(`${twilioSID}:${twilioToken}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const options = new RequestOptions({headers});

    return this._http.post('https://api.twilio.com/2010-04-01/Accounts/ACf70115d6d0f440c688e364db114e49ed/Messages.json', body, options);
  }

}

class Guid {
  static newGuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
          return v.toString(16);
      });
  }
}
