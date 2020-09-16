import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../interfaces/user-model';
import { RegistrationOtpModel } from '../interfaces/registration-otp-model';
import { AlertSrevice, AlertType } from './alert.service';
import { ProfileStatus } from '../interfaces/profile-status';
import { LoadingService } from './loading.service';
import { PaymentModel } from '../interfaces/payment-model';
import { UpdateUserStatusModel } from '../interfaces/update-user-status-model';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastService } from './toast.service';
import { CharityModel } from '../interfaces/charity-model';
import { SmsModel } from '../interfaces/sms-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //  private url = 'http://localhost:59789/api/';
  //  private url = 'http://192.168.1.4:5555/api/';
 // private url = 'http://manish23-001-site1.ftempurl.com/api/';
   private url = 'http://www.punjabisamajrewari.com/api/';
  constructor(private httpClient: HttpClient,
              private alertService: AlertSrevice,
              private loadingService: LoadingService,
              private toastService: ToastService) {
    this.handleErrorMessage.bind(this);
  }
  private responseData;

  getAllUser() {
    const allUserUrl = this.url + 'user/';
    return new Promise(resolve => {
      // We're using Angular HTTP provider to request the data,
      // then on the response, it'll map the JSON data to a parsed JS object.
      // Next, we process the data and resolve the promise with the new data.
      // //
      this.httpClient.get(`${allUserUrl}`)
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          resolve(data);
        });

      // this.httpClient.get(`${this.url}`)
      // .subscribe(data => {
      //   // we've got back the raw data, now generate the core schedule data
      //   // and save the data for later reference
      //   this.responseData = data;
      //   resolve(this.responseData);
      // });
    });
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    // this.loadingService.dimissLoading();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
      // this.alertService.presentAlert(error.error.message, AlertType.error);
      // this.loadingService.dimissLoading();
      this.toastService.presentToast(error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(
      //   `Backend returned code ${error.status}, ` +
      //   `body was: ${error.error}`);
      // this.loadingService.dimissLoading();
      this.toastService.presentToast(error.error.message);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  handleErrorMessage(error: any) {
    this.loadingService.dimissLoading();
    if (error && error.error && error.error.message) {
      this.toastService.presentToast(error.error.message);
    } else {
      this.toastService.presentToast('Something bad happened; please try again later.');
    }
  }

  sendOtp(registerUserOtpModel: RegistrationOtpModel) {
    this.loadingService.presentLoading();
    const otpUrl = this.url + 'user/sendotp/';
    const promise = new Promise(resolve => {
      this.httpClient.post(`${otpUrl}`, registerUserOtpModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  verifyOtp(registerUserOtpModel: RegistrationOtpModel) {
    this.loadingService.presentLoading();
    const otpUrl = this.url + 'user/verifyotp/';
    const promise = new Promise(resolve => {
      const loadingService = this.loadingService;
      this.httpClient.post(`${otpUrl}`, registerUserOtpModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  registerUser(userModel: FormData) {
    this.loadingService.presentLoading('Registering User.. Please do not press back button');
    const registerUserUrl = this.url + 'user/register/';
    const promise = new Promise(resolve => {
      this.httpClient.post(`${registerUserUrl}`, userModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getUserByMobile(mobileNumber: number, showLoader: boolean) {
    if (showLoader) {
      this.loadingService.presentLoading();
    }
    const getUserUrl = this.url + 'user/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}` + mobileNumber).subscribe(data => {
        if (showLoader) {
          this.loadingService.dimissLoading();
        }
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getUserByType(userType: string, showLoader: boolean) {
    if (showLoader){
     this.loadingService.presentLoading();
    }
    const getUserUrl = this.url + 'user/GetUsersByType';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}` + '?userType=' + userType).subscribe(data => {
        if (showLoader){
        this.loadingService.dimissLoading();
        }
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getUserByMemberId(memberIdNumber: number) {
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'user/GetByMemberId';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}` + '?memberId=' + memberIdNumber).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getUserUpdateRequest(IdNumber: number) {
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'user/GetUserUpdateRequest';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}` + '?updateUserId=' + IdNumber).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  registerPayment(paymentModel: PaymentModel) {
    this.loadingService.presentLoading();
    const updatePaymentUrl = this.url + 'user/UpdatePayment/';
    const promise = new Promise(resolve => {
      this.httpClient.post(`${updatePaymentUrl}`, paymentModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getUserImage(path: string) {
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'user/getImage/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}` + '?Imagepath=' + path).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  updateUser(userModel: FormData) {
    this.loadingService.presentLoading();
    const registerUserUrl = this.url + 'user/RequestUpdateUser/';
    const promise = new Promise(resolve => {
      this.httpClient.put(`${registerUserUrl}`, userModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  changeUpdateUserStatus(updateUserStatusModel: UpdateUserStatusModel) {
    this.loadingService.presentLoading();
    const userStatusUpdateUrl = this.url + 'user/ChangeUpdateUserStatus/';
    const promise = new Promise(resolve => {
      this.httpClient.put(`${userStatusUpdateUrl}`, updateUserStatusModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  changeProfileStatus(profileStatusModel: ProfileStatus) {
    this.loadingService.presentLoading();
    const profileSatusUrl = this.url + 'user/changeProfileStatus';
    const promise = new Promise(resolve => {
      this.httpClient.put(`${profileSatusUrl}`, profileStatusModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  sendSms(smsModel: SmsModel) {
    this.loadingService.presentLoading();
    const smsUrl = this.url + 'user/SendSms/';
    const promise = new Promise(resolve => {
      this.httpClient.post(`${smsUrl}`, smsModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getAllPayment(tempUserId: number) {
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'user/getPayment/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}` + '?tempUserId=' + tempUserId).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getDirectory() {
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'user/getDirectory/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}`).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getBusinessSearch() {
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'user/getBusinessSearch/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}`).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }
}
