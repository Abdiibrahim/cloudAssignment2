import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageDetails } from '../_shared/_models/imageDetails';
import { ImageService } from '../_shared/_services/image.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  imageURL: string;

  imageDetails: ImageDetails;

  columns: string[];

  constructor(private _route: ActivatedRoute,
              private _imageService: ImageService) {
    this.imageURL = this._route.snapshot.paramMap.get('img');

    this._imageService.analyzeImage(this.imageURL).subscribe(res => {
      this.imageDetails = res;
      console.log(this.imageDetails);
    });
  }

  ngOnInit() {
    this.columns = ['Colours', 'Tags'];
  }

  sendSMS(imageDetails: ImageDetails) {
    this._imageService.sendSMS(imageDetails).subscribe(res => {
      console.log(res);
    });
  }

}
