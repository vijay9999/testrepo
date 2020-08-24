import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { RegistrationOtpModel } from '../interfaces/registration-otp-model';
import { ToastService } from '../services/toast.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { AppConstant } from '../common/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isOtpSent: boolean;
  mobileNumber: number;
  mobileRegExp: RegExp = new RegExp('^((\\+91-?)|0)?[0-9]{10}$');
  constructor(private loginService: LoginService,
              private storageService: StorageService,
              private router: Router,
              private authService: AuthService,
              private alertService: AlertSrevice) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      otpNumber: new FormControl(null, Validators.required),
      memberId: new FormControl(null, Validators.required)
    });
    this.isOtpSent = false;
  }
  sendOtp() {
    this.storageService.getString(AppConstant.StorageConstant.MobileNumber)
      .then((data) => {
        this.mobileNumber = +data;
        const isMobileNumberValid = this.mobileNumber ? this.mobileRegExp.test(this.mobileNumber.toString()) : false;
        const memberId = this.loginForm.get('memberId');
        if (isMobileNumberValid && memberId.valid) {
          const registrationModel: RegistrationOtpModel = { MobileNumber: this.mobileNumber, MemberId: memberId.value };
          this.loginService.sendOtp(registrationModel).then(
            response => {
              this.isOtpSent = true,
                console.log(response);
            }
          ).catch(response => console.log(response));
        } else {
          this.router.navigate(['/']);
        }
      }).catch((response) => console.log(response));
  }

  verifyOtp() {

    const isMobileNumberValid = this.mobileNumber ? this.mobileRegExp.test(this.mobileNumber.toString()) : false;
    const memberIdForm = this.loginForm.get('memberId');
    const otpNumberForm = this.loginForm.get('otpNumber');
    if (isMobileNumberValid && memberIdForm.valid && otpNumberForm.valid) {
      const registrationModel: RegistrationOtpModel = {
        MobileNumber: this.mobileNumber,
        MemberId: memberIdForm.value,
        Otp: otpNumberForm.value };
      this.loginService.verifyOtp(registrationModel).then(
        response => {
         // this.toastService.presentToast('User verified!!!');
          this.isOtpSent = true,
          this.storageService.setString(AppConstant.StorageConstant.MemberId, memberIdForm.value).then(() =>
            this.authService.redirectLoggedInUser()
          );
            // console.log(response);
         // this.router.navigate(['/menu/admin-user']);
          // this.router.navigate(['/menu/user-details']);
        }
      ).catch(response =>  console.log(response));
    } else {
      this.alertService.presentAlert('Some error Occured..Redirecting to initial page', AlertType.error);
      this.router.navigate(['/']);
    }
  }

}
