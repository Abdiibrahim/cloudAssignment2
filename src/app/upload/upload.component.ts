import { Component, OnInit } from '@angular/core';
import { ImageService } from '../_shared/_services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  file: File = null;

  isFileSelected = false;

  constructor(private _imageService: ImageService) { }

  ngOnInit() {
  }

  fileSelected(event) {
    this.file = <File>event.target.files[0];
    this.isFileSelected = true;
  }

  upload() {
    this._imageService.uploadImage(this.file);
  }

}
