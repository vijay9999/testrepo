// my-modal.page.ts
import { Component, OnInit } from '@angular/core';
import {
  NavParams, PopoverController, Platform
} from '@ionic/angular';
import { UserModel } from '../interfaces/user-model';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from '../services/modal.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertType, AlertSrevice } from '../services/alert.service';
import { Router } from '@angular/router';
import { ProfileStatus } from '../interfaces/profile-status';
import { ImagePopOverComponent } from '../image-popover/image-popover.page';
import { AppConstant } from '../common/constant';
import { StorageService } from '../services/storage.service';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { PaymentModel } from '../interfaces/payment-model';
import { UpdateUserStatusModel } from '../interfaces/update-user-status-model';

@Component({
  selector: 'app-my-modal',
  templateUrl: './edit-user-detail.html',
  styleUrls: ['./edit-user-detail.page.scss'],
})
export class EditUserDetailPage implements OnInit {
  registrationForm: FormGroup;
  userModel: UserModel;
  isDetail: boolean;
  registrationModel: UserModel;
  formData: FormData;
  currentUserType = '';
  approveButtonName = 'Approve';
  loggedInUser = '';
  isTempUser = false;
  isUserUpdateRequestRaised = false;
  userNotificationMessage1 = '';
  userNotificationMessage2 = '';
  showTempPayButton = false;
  showTempUpdateButton = false;
  constructor(
    private modalService: ModalService,
    private navParams: NavParams,
    public sanitizer: DomSanitizer,
    private popOverController: PopoverController,
    private loginService: LoginService,
    private alertService: AlertSrevice,
    private router: Router,
    private storageService: StorageService,
    private webIntent: WebIntent,
    private platform: Platform
  ) {
    this.isDetail = true;
    this.storageService.getString(AppConstant.StorageConstant.MemberId).then((data) => {
      this.loggedInUser = data;
    });
  }

  ngOnInit() {
    const params = this.navParams.data.param;
    this.userModel = params.userModel;
    this.userModel.updateUserId = this.userModel.updateUserId ? this.userModel.updateUserId :
      this.userModel.memberID ? this.userModel.memberID : this.userModel.id;
    this.currentUserType = params.currentUserType;
    this.createRegistrationForm();
    this.setDefaultSelectedValue();
    this.formData = new FormData();
    if (this.currentUserType === AppConstant.UserTypeConstant.TempUserDetail) {
      this.isTempUser = true;
      if (!this.userModel.isDocumentApproved && !this.userModel.isDoucmentRejected) {
        this.userNotificationMessage1 = AppConstant.NotificationConstant.Pending;
        this.showTempPayButton = false;
        this.showTempUpdateButton = false;
        // not show pay button
        // not show update button
      } else if (this.userModel.isDocumentApproved && !this.userModel.isPaymentDone) {
        this.userNotificationMessage1 = AppConstant.NotificationConstant.Approved;
        this.showTempUpdateButton = true;
        this.showTempPayButton = true;
        // show pay button
        // show update button
      } else if (this.userModel.isDoucmentRejected && !this.userModel.isDocumentApproved) {
        this.userNotificationMessage1 = AppConstant.NotificationConstant.Rejected;
        this.showTempPayButton = false;
        this.showTempUpdateButton = true;
        // not show pay button
        // show update button
      }
      this.getUpdationRequestRaised();
    }
    else if (this.currentUserType === AppConstant.UserTypeConstant.Pending) {
      this.approveButtonName = 'Approve Document';
    }
    // else if (this.currentUserType === AppConstant.UserTypeConstant.PaymentDone){
    //   this.approveButtonName = 'Approve Payment';
    // }


  }

  createRegistrationForm() {
    this.registrationForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      dob: new FormControl(null, Validators.required),
      careTakerName: new FormControl(null, Validators.required),
      mobileNumber: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      whatsappNumber: new FormControl(null, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      address: new FormControl(null, Validators.required),
      wardNumber: new FormControl(null, Validators.required),
      qualification: new FormControl(null, Validators.required),
      occupation: new FormControl(null, Validators.required),
      businessCategory: new FormControl(null, Validators.required),
      businessSubCategory: new FormControl(null, Validators.required),
      bloodGroup: new FormControl(null, Validators.required),
      bloodDonation: new FormControl(null, Validators.required),
      socialServices: new FormControl(null, Validators.required),
      aadharNumber: new FormControl(null, Validators.required),
      panNumber: new FormControl(null),
      userImage: new FormControl(null),
      idProof: new FormControl(null),
      addressProof: new FormControl(null),
      userImageByte: new FormControl(null),
      idProofByte: new FormControl(null),
      addressProofByte: new FormControl(null),
      memberID: new FormControl(null),
      id: new FormControl(null),
      rejectReason: new FormControl(null),
      updatedBy: new FormControl(null),
      updateUserId: new FormControl(null)
    });
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }

  async presentPopover(popData) {
    const popover = await this.popOverController.create({
      component: ImagePopOverComponent,
      componentProps: {
        title: 'Image',
        sub: '',
        img: popData
      },
      translucent: true,
      backdropDismiss: false
    });
    return await popover.present();
  }

  setDefaultSelectedValue() {
    this.registrationForm.get('gender').setValue(this.userModel.gender.toUpperCase());
    this.registrationForm.get('qualification').setValue(this.userModel.qualification.toUpperCase());
    this.registrationForm.get('occupation').setValue(this.userModel.occupation.toUpperCase());
    this.registrationForm.get('businessCategory').setValue(this.userModel.businessCategory.toUpperCase());
    this.registrationForm.get('businessSubCategory').setValue(this.userModel.businessSubCategory.toUpperCase());
    this.registrationForm.get('bloodGroup').setValue(this.userModel.bloodGroup.toUpperCase());
    this.registrationForm.get('bloodDonation').setValue(this.userModel.bloodDonation.toUpperCase());
    this.registrationForm.get('socialServices').setValue(this.userModel.socialServices.toUpperCase());
    this.registrationForm.get('dob').setValue(new Date(this.userModel.dob).toDateString());
    this.registrationForm.get('userImageByte').setValue(this.userModel.userImageByte);
    this.registrationForm.get('addressProofByte').setValue(this.userModel.addressProofByte);
    this.registrationForm.get('idProofByte').setValue(this.userModel.idProofByte);
    this.registrationForm.get('memberID').setValue(this.userModel.memberID);
    this.registrationForm.get('id').setValue(this.userModel.id);
    this.registrationForm.get('updatedBy').setValue(this.loggedInUser ? this.loggedInUser : this.userModel.id);
    this.registrationForm.get('updateUserId').setValue(this.userModel.updateUserId);
  }

  loadImageFromDevice(event) {

    const files = event.target.files;

    const fileToUpload = files[0] as File;

    if (event.target.id === 'userImageInput') {
      this.formData.append('userImage', fileToUpload, fileToUpload.name);
    }
    else if (event.target.id === 'idProofInput') {
      this.formData.append('idProof', fileToUpload, fileToUpload.name);
    }
    else if (event.target.id === 'addressProofInput') {
      this.formData.append('addressProof', fileToUpload, fileToUpload.name);
    }

  }

  updateUser() {
    if (this.registrationForm.valid) {
      this.registrationModel = { ...this.registrationModel, ...this.registrationForm.value };
      if (this.registrationModel) {
        // tslint:disable-next-line: forin
        for (const key in this.registrationModel) {
          if (!(key === 'userImage' || key === 'idProof' || key === 'addressProof')) {
            this.formData.set(key, this.registrationModel[key] === null ? 0 : this.registrationModel[key]);
          }
        }
      }
      // this.formData.append('memberID', this.userModel.memberID.toString());
      this.loginService.updateUser(this.formData).then(data => {
        this.alertService.presentAlert('User Updated!!', AlertType.sucess);
        this.closeModal();
      }
      ).catch(data => {
        console.log(data);
      });
    } else {
      this.alertService.presentAlert('Please enter mandatory details !!', AlertType.error);
    }
  }

  onDocumentApproval() {
    const profileModel: ProfileStatus = {
      id: this.userModel.id,
      isDocumentApproved: true,
      isDoucmentRejected: false,
      isPaymentApproved: false,
      isUpdationApproved: false,
      userType: AppConstant.UserTypeConstant.Approved,
      memberID: null,
      statusChangedBy: this.loggedInUser,
      rejectReason: ''
    };
    this.loginService.changeProfileStatus(profileModel).then(data => {
      this.alertService.presentAlert('Profile Approved!!', AlertType.sucess);
      this.closeModal();
    }
    ).catch(data => {
      console.log(data);
    });
  }

  onDocumentRejection() {
    if (this.registrationForm.get('rejectReason').value) {
      const profileModel: ProfileStatus = {
        id: this.userModel.id,
        isDocumentApproved: false,
        isDoucmentRejected: true,
        isPaymentApproved: false,
        isUpdationApproved: false,
        userType: AppConstant.UserTypeConstant.Rejected,
        memberID: null,
        statusChangedBy: this.loggedInUser,
        rejectReason: this.registrationForm.get('rejectReason').value
      };
      this.loginService.changeProfileStatus(profileModel).then(data => {
        this.alertService.presentAlert('Profile Rejected!!', AlertType.sucess);
        this.closeModal();
      }
      ).catch(data => {
        console.log(data);
      });
    } else {
      this.alertService.presentAlert('Please enter reject reason !!', AlertType.error);
    }
  }

  onUserUpdateApproval() {
    const updateUserStatusModel: UpdateUserStatusModel = {
      id: this.userModel.id,
      updateUserId: this.userModel.updateUserId,
      isUpdationApproved: true,
      isUpdationRejected: false,
      rejectReason: ''
    };
    this.loginService.changeUpdateUserStatus(updateUserStatusModel).then(data => {
      this.alertService.presentAlert('Profile Approved!!', AlertType.sucess);
      this.closeModal();
    }
    ).catch(data => {
      console.log(data);
    });
  }

  onUserUpdateRejection() {
    if (this.registrationForm.get('rejectReason').value) {
      const updateUserStatusModel: UpdateUserStatusModel = {
        id: this.userModel.id,
        updateUserId: this.userModel.updateUserId,
        isUpdationApproved: false,
        isUpdationRejected: true,
        rejectReason: this.registrationForm.get('rejectReason').value
      };
      this.loginService.changeUpdateUserStatus(updateUserStatusModel).then(data => {
        this.alertService.presentAlert('Profile Rejected!!', AlertType.sucess);
        this.closeModal();
      }
      ).catch(data => {
        console.log(data);
      });
    }
  }

  onApproval() {
    if (this.currentUserType === AppConstant.UserTypeConstant.UpdationRequest) {
      this.onUserUpdateApproval();
    } else {
      this.onDocumentApproval();
    }
  }

  onRejection() {
    if (this.currentUserType === AppConstant.UserTypeConstant.UpdationRequest) {
      this.onUserUpdateRejection();
    } else {
      this.onDocumentRejection();
    }
  }
  changeProfileStatus(status: string) {
    if (status === 'Approve') {
      this.alertService.presentAlertConfirm('Approve', 'Are you sure you want to approve!!'
        , AlertType.sucess, this.onApproval.bind(this), () => { });
    } else {
      this.alertService.presentAlertConfirm('Reject', 'Are you sure you want to reject!!',
        AlertType.error, this.onRejection.bind(this), () => { });
    }
  }

  pay() {
    if (this.platform.is('mobile') && !this.platform.is('android')) {
      const paymentModel: PaymentModel = {
        amount: 100,
        id: 0,
        paymentDoneForTempUserId: this.userModel.id,
        paymentDoneById: this.userModel.id.toString(),
        paymentDoneForMemberId: 0,
        upiId: ''
      };
      this.loginService.registerPayment(paymentModel).then((data) => {
        console.log('Payment Successfull');
      }).catch((data) => {
        console.log('Payment not successfull');
      });
    } else {
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
      this.webIntent.startActivityForResult(option).then(Success => {
        console.log(Success);
        if (Success.extras.status === 'SUCCESS') {
          const paymentModel: PaymentModel = {
            amount: 100,
            id: 0,
            paymentDoneForTempUserId: this.userModel.id,
            paymentDoneById: this.userModel.id.toString(),
            paymentDoneForMemberId: 0,
            upiId: ''
          };
          this.loginService.registerPayment(paymentModel).then((data) => {
            console.log('Payment Successfull');
          }).catch((data) => {
            console.log('Payment not successfull');
          });
        } else if (Success.extras.status === 'SUBMITTED') {
          console.log('SUBMITTED');
        } else if (Success.extras.status === 'Failed' || Success.extras.status === 'FAILURE') {
          console.log('FAILED');
        }
      });
    }
  }

  getUpdationRequestRaised() {
    this.loginService.getUserUpdateRequest(this.userModel.updateUserId).then((data) => {
      if (data) {
        this.isUserUpdateRequestRaised = true;
        if (this.isUserUpdateRequestRaised) {
          this.userNotificationMessage2 = AppConstant.NotificationConstant.UpdationPending;
          this.showTempPayButton = false;
          this.showTempUpdateButton = false;
          // not show pay button
          // not show update button
        }
      }
    });
  }
}
