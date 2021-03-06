import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { RegistrationOtpModel } from '../interfaces/registration-otp-model';
import { LoadingService } from '../services/loading.service';
import { AppConstant } from '../common/constant';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-otp-login',
  templateUrl: './otp-login.component.html',
  styleUrls: ['./otp-login.component.scss'],
})
export class OtpLoginComponent implements OnInit {
  countries: any;
  otpForm: FormGroup;
  isOtpSent: boolean;
  mobileNumberForm: AbstractControl;
  userNameForm: AbstractControl;
  isEnglish = true;
  // timer = 60;
  // m = 1;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private storageService: StorageService,
    private loadingService: LoadingService,
    private languageService: LanguageService) {
    this.storageService.getString(AppConstant.StorageConstant.MobileNumber)
      .then((data) => {
        if (data != null) {
          this.router.navigate(['/home']);
        } else {
          this.storageService.clear();
          this.getCountriesList();
        }
      }).catch(() => {
        this.storageService.clear();
        this.getCountriesList();
      });
  }
  ngOnInit() {
    // this.phoneNumber = "^(\+\d{1,3}[- ]?)?\d{10}$";
    this.otpForm = new FormGroup({
      countryCode: new FormControl(),
      mobileNumber: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      otpNumber: new FormControl(null, Validators.required),
      userName: new FormControl(null, Validators.required)
    });
    this.isOtpSent = false;
    this.otpForm.get('countryCode').setValue('+91 ');
  }
  getCountriesList() {
    this.countries = [
      {
        code: '+91',
        name: 'India'
      }
    ];
    this.isOtpSent = false;
  }
  selectHindi() {
    this.languageService.setLanguage('hi');
    this.isEnglish = false;
  }
  selectEnglish() {
    this.languageService.setLanguage('en');
    this.isEnglish = true;
  }
  sendOtp() {
    this.mobileNumberForm = this.otpForm.get('mobileNumber');
    const isMobileValid = this.mobileNumberForm.valid;
    this.userNameForm = this.otpForm.get('userName');
    const isUserValid = this.userNameForm.valid;
    if (isMobileValid && isUserValid) {
      const mobileNumber = this.mobileNumberForm.value;
      const userName = this.userNameForm.value;
      const registerUserOtpModel: RegistrationOtpModel = { MobileNumber: mobileNumber, UserName: userName };
      // this.loadingService.presentLoading();
      this.loginService.sendOtp(registerUserOtpModel).then(data => {
       //  this.startTimer(360);
        this.isOtpSent = true;
        //  this.loadingService.dimissLoading();
      }
      ).catch(data => console.log(data));
    }
  }
  // startTimer(timerValue) {
  //   const IntervalVar = setInterval(function() {
  //     this.timer = timerValue / 60;
  //     this.timer--;

  //     if (this.timer === 0) {

  //       this.timer = 60;

  //       this.m -= 1;

  //     }

  //     if (this.m === 0) {

  //       this.timer = '00';

  //       this.m = '00';

  //       clearInterval(IntervalVar);

  //     }

  //   }.bind(this), 1000);
  // }

  verifyOtp() {
    const otpNumberForm = this.otpForm.get('otpNumber');
    if (this.mobileNumberForm.valid
      && this.userNameForm.valid
      && otpNumberForm.valid) {
      const registerUserOtpModel: RegistrationOtpModel = {
        MobileNumber: +this.mobileNumberForm.value,
        UserName: this.userNameForm.value,
        Otp: +otpNumberForm.value
      };
      // this.loadingService.presentLoading();
      this.loginService.verifyOtp(registerUserOtpModel).then(data => {

        this.storageService.setString(AppConstant.StorageConstant.MobileNumber, this.mobileNumberForm.value).then(() => {
          this.storageService.setString(AppConstant.StorageConstant.UserName, this.userNameForm.value).then(() => {
            // this.loadingService.dimissLoading();
            // this.router.onSameUrlNavigation = 'reload';
            this.isOtpSent = false;
            this.router.navigate(['/home']);
          });
        });

      }
      ).catch(data => {

      });
    }
  }

}
