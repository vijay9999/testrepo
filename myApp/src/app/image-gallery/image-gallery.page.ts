import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ModalService } from '../services/modal.service';
import { ImageModalPage } from '../image-modal/image-modal.page';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.page.html',
  styleUrls: ['./image-gallery.page.scss'],
})
export class ImageGalleryPage implements OnInit {
  images = [];

  constructor(private homeService: HomeService, private modalService: ModalService) { }

  ngOnInit() {
    this.homeService.getGalleryImageName().then(
      data => this.images = data as []
    ).catch(() =>
      console.log('Some error occured')
    );
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }

  openPreview(image) {
    this.modalService.presentModal(ImageModalPage, { img: image, type: 'gallery' });
  }
}
