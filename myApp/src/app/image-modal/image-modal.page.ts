import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalService } from '../services/modal.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  src: any;
  @ViewChild('slider', { read: ElementRef }) slider: ElementRef;
  slideOptions = {
    zoom: {
      maxRatio: 8
    }
  };
  constructor(private navParams: NavParams,
              private modalService: ModalService,
              private homeService: HomeService) { }

  ngOnInit() {
    const param = this.navParams.data.param;
    if (param.type === 'gallery') {
      this.src = this.homeService.getImage('Gallery', param.img);
    } else if (param.type === 'slide') {
      this.src = 'assets/img/' + param.img;
    } else {
      this.src = param.img;
    }
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
