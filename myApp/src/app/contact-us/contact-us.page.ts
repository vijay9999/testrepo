// my-modal.page.ts
import { Component, OnInit } from '@angular/core';
import {
  NavParams, PopoverController
} from '@ionic/angular';
import { UserModel } from '../interfaces/user-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from '../services/modal.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AlertType, AlertSrevice } from '../services/alert.service';
import { Router } from '@angular/router';
import { ProfileStatus } from '../interfaces/profile-status';

@Component({
  selector: 'app-contact-us-modal',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  constructor(
    private modalService: ModalService,
    private navParams: NavParams,
    private alertService: AlertSrevice,
    private router: Router
  ) {
    // this.isDetail = true;
  }

  ngOnInit() {
   // this.userModel = this.navParams.data.param;
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }

}
