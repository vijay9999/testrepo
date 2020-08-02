import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  img: any;
  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;
  slideOptions = {
    zoom: {
      maxRatio: 8
    }
  };
  constructor(private navParams: NavParams,
              private modalService: ModalService) { }

  ngOnInit() {
    const param = this.navParams.data.param;
    this.img = param.img;
  }

  zoom(zoomIn: boolean) {
    const zoom = this.slider.nativeElement.swiper.zoom;
    if (zoomIn) {
      zoom.enable();
      zoom.in();
      //  zoom.scale =2;
    } else {
      zoom.out();
    }
  }

  close() {
    this.modalService.dismiss('');
  }
}
