import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserModel } from '../interfaces/user-model';
import { PopoverController, NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-my-popover',
    templateUrl: './image-popover.html',
    styleUrls: ['./image-popover.page.scss'],
  })
  export class ImagePopOverComponent implements OnInit {
    img: any;
    ngOnInit(): void {
       const image = this.navParam.data.img;
       this.img = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + image);
    }

    /**
     *
     */
    constructor(private popOverController: PopoverController,
                private navParam: NavParams,
                private sanitizer: DomSanitizer ) {

    }

    async closePopOver() {
        // const onClosedData: string = "Wrapped Up!";
        await this.popOverController.dismiss();
      }



  }
