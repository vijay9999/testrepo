import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserModel } from '../interfaces/user-model';
import { PopoverController, NavParams } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { SmsModel } from '../interfaces/sms-model';
import { LoginService } from '../services/login.service';
import { ToastService } from '../services/toast.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-popover',
  templateUrl: './sms-popover.html',
  styleUrls: ['./sms-popover.page.scss'],
})
export class SmsPopOverPage implements OnInit {
  userMobileNumberList: any;
  message: string;
  ngOnInit(): void {
    this.userMobileNumberList = this.navParam.data.userSmsList;
  }

  /**
   *
   */
  constructor(private popOverController: PopoverController,
              private navParam: NavParams,
              private loginService: LoginService,
              private toastService: ToastService,
              private formsBuilder: FormBuilder) {

  }

  async closePopOver() {
    // const onClosedData: string = "Wrapped Up!";
    await this.popOverController.dismiss();
  }

  sendSms() {
    const smsModel: SmsModel = {
      message: this.message,
      mobileNumber: this.userMobileNumberList,
      messageType: 'User'
    };
    this.loginService.sendSms(smsModel).then(data => {
      this.toastService.presentToast('Message sent successfully');
      this.closePopOver();
    }).catch(() => {
      this.toastService.presentToast('Some error occured.. Message not sent');
      this.closePopOver();
    });
  }


}
