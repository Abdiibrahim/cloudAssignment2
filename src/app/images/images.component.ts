import { Component, OnInit } from '@angular/core';
import { ImageService } from '../_shared/_services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  images: string[];

  constructor(private _imageService: ImageService) {
    let p = this._imageService.getImages();
    p.snapshotChanges().subscribe(res => {
      this.images = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        this.images.push(a as string);
      });
    });
  }

  ngOnInit() {
  }

}
