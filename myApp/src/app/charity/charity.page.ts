import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { CharityModel } from '../interfaces/charity-model';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { LoginService } from '../services/login.service';
import { HomeService } from '../services/home.service';
import { Platform } from '@ionic/angular';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { StorageService } from '../services/storage.service';
import { AppConstant } from '../common/constant';
import { ConfigModel } from '../interfaces/configuration-model';
import { UpiModel } from '../interfaces/upi-model';

@Component({
  selector: 'app-charity',
  templateUrl: './charity.page.html',
  styleUrls: ['./charity.page.scss'],
})
export class CharityPage implements OnInit {
  charityForm: FormGroup;
  charityModel: CharityModel;
  upiModel: UpiModel = {
    payeeName: '',
    payeeVpa: '',
    amount: '',
    currency: '',
    transactionNote: ''
  };
  constructor(private modalService: ModalService,
              private alertService: AlertSrevice,
              private homeService: HomeService,
              private platform: Platform,
              private webIntent: WebIntent,
              private storageService: StorageService) {
                this.getUpiDetails();
  }

  ngOnInit() {
    this.charityForm = new FormGroup({
      name: new FormControl(null),
      mobileNumber: new FormControl(null, [Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      amount: new FormControl(null, Validators.required),
      socialServiceDonation: new FormControl(null),
      marraigeDonation: new FormControl(null),
      medicalDonation: new FormControl(null),
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
  getUpiDetails() {
    this.storageService.getObject(AppConstant.StorageConstant.Payment).then((data) => {
      if (data && data != null) {
        this.upiModel = data as any as UpiModel;
      } else {
        this.homeService.getConfigSectionValue(AppConstant.StorageConstant.Payment, true).then((data2: any) => {
          if (data2 && data2.configValueList) {
            const configValueList = data2.configValueList as ConfigModel[];
            const payeeVpa = configValueList.find(config => config.key === 'Vpa');
            const payeeName = configValueList.find(config => config.key === 'Name');
            const currency = configValueList.find(config => config.key === 'Currency');
            const transactionNote = configValueList.find(config => config.key === 'TransactionNote');
            const amount = configValueList.find(config => config.key === 'Amount');
            if (payeeVpa) {
              this.upiModel.payeeVpa = payeeVpa.value;
            }
            if (payeeName) {
              this.upiModel.payeeName = payeeName.value;
            }
            if (currency) {
              this.upiModel.currency = currency.value;
            }
            if (transactionNote) {
              this.upiModel.transactionNote = transactionNote.value;
            }
            if (amount) {
              this.upiModel.amount = amount.value;
            }
            this.storageService.setObject(AppConstant.StorageConstant.Payment, this.upiModel);
          }
        });
      }
    }).catch(() => {
      this.homeService.getConfigSectionValue(AppConstant.StorageConstant.Payment, true).then((data: any) => {
        if (data && data.configValueList) {
          const configValueList = data.configValueList as ConfigModel[];
          const payeeVpa = configValueList.find(config => config.key === 'Vpa');
          const payeeName = configValueList.find(config => config.key === 'Name');
          const currency = configValueList.find(config => config.key === 'Currency');
          const transactionNote = configValueList.find(config => config.key === 'TransactionNote');
          const amount = configValueList.find(config => config.key === 'Amount');
          if (payeeVpa) {
            this.upiModel.payeeVpa = payeeVpa.value;
          }
          if (payeeName) {
            this.upiModel.payeeName = payeeName.value;
          }
          if (currency) {
            this.upiModel.currency = currency.value;
          }
          if (transactionNote) {
            this.upiModel.transactionNote = transactionNote.value;
          }
          if (amount) {
            this.upiModel.amount = amount.value;
          }
          this.storageService.setObject(AppConstant.StorageConstant.Payment, this.upiModel);
        }
      });
    });
  }

  payCharity() {
    if (this.validateDonationReason() && this.charityForm.valid) {
      this.charityModel = { ...this.charityModel, ...this.charityForm.value };
      if (this.charityModel) {
        if (!this.charityModel.mobileNumber){
          this.charityModel.mobileNumber = 0;
        }
        if (this.platform.is('mobile') && !this.platform.is('android')) {
          this.homeService.addCharity(this.charityModel).then(data => {
            this.alertService.presentAlert('Payment Successfull', AlertType.sucess);
            this.closeModal();
          }
          ).catch(data => {
            console.log(data);
          });
        } else {
          const payeeVPA = this.upiModel.payeeVpa;
          const payeeName = this.upiModel.payeeName;
          const payAmount = this.upiModel.amount;
          const transectionNote = this.upiModel.transactionNote;
          const currency = this.upiModel.currency;
          const url = 'upi://pay?pa=' + payeeVPA + '&pn=' + payeeName + '&tn=' + transectionNote +
            '&am=' + payAmount + '&cu=' + currency;
          const option = {
            action: this.webIntent.ACTION_VIEW,
            url
          };
          this.webIntent.startActivityForResult(option).then(Response => {
            if (Response.extras.Status === 'SUCCESS') {
              console.log(Response);
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
