import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { CharityModel } from '../interfaces/charity-model';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { LoginService } from '../services/login.service';
import { HomeService } from '../services/home.service';
import { Platform } from '@ionic/angular';
import { WebIntent } from '@ionic-native/web-intent/ngx';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.page.html',
  styleUrls: ['./charity.page.scss'],
})
export class CharityPage implements OnInit {
  charityForm: FormGroup;
  charityModel: CharityModel;
  constructor(private modalService: ModalService,
              private alertService: AlertSrevice,
              private homeService: HomeService,
              private platform: Platform,
              private webIntent: WebIntent) { }

  ngOnInit() {
    this.charityForm = new FormGroup({
      name: new FormControl(null),
      mobileNumber: new FormControl(null, [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      amount: new FormControl(null, Validators.required),
      socialServiceDonation: new FormControl(null),
      marraigeDonation: new FormControl(null),
      educationDonation: new FormControl(null),
      charityMessage: new FormControl(null)
    });
    this.charityForm.get('socialServiceDonation').setValue(true);
    this.charityForm.get('marraigeDonation').setValue(false);
    this.charityForm.get('educationDonation').setValue(false);
    this.charityForm.get('medicalDonation').setValue(false);
  }

  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }
  payCharity() {
    if (this.validateDonationReason() && this.charityForm.valid) {
      this.charityModel = { ...this.charityModel, ...this.charityForm.value };
      if (this.charityModel) {
        if (this.platform.is('mobile') && !this.platform.is('android')){
          this.homeService.addCharity(this.charityModel).then(data => {
            this.alertService.presentAlert('Payment Successfull', AlertType.sucess);
            this.closeModal();
          }
          ).catch(data => {
            console.log(data);
          });
        } else{
          const payeeVPA = '918860007378@scb';
          const payeeName = 'Ankur Patro';
          const payAmount = 10;
          const transectionReference = '#1234456778';
          const transectionNote = 'Payment for Punjabi Samaj';
          const currency = 'INR';
          const url = 'upi://pay?pa=' + payeeVPA + '&pn=' + payeeName + '&tr=' + transectionReference +
        '&tn=' + transectionNote + '&am=' + payAmount + '&cu=' + currency;
          const option = {
        action: this.webIntent.ACTION_VIEW,
        url
      };
          this.webIntent.startActivityForResult(option).then(Response => {
            if (Response.extras.Status === 'SUCCESS') {
              this.homeService.addCharity(this.charityModel).then(data => {
                this.alertService.presentAlert('Payment Successfull', AlertType.sucess);
                this.closeModal();
              }
              ).catch(data => {
                console.log(data);
              });
            } else if (Response.extras.status === 'SUBMITTED') {
              console.log('SUBMITTED');
            } else if (Response.extras.status === 'Failed' || Response.extras.status === 'FAILURE') {
              console.log('FAILED');
            }
          });
        }
      }
    } else {
      this.alertService.presentAlert('Please select charity reason', AlertType.error);
    }
  }

  validateDonationReason() {
    if (this.charityForm.get('socialServiceDonation').value === false &&
      this.charityForm.get('educationDonation').value === false &&
      this.charityForm.get('marraigeDonation').value === false &&
      this.charityForm.get('medicalDonation').value === false) {
      return false;
    }
    return true;
  }
}
