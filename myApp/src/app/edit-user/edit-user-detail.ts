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
import { ToastService } from '../services/toast.service';
import { HomeService } from '../services/home.service';
import { ConfigModel } from '../interfaces/configuration-model';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { UpiModel } from '../interfaces/upi-model';

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
  showTempPayButton = true;
  showTempUpdateButton = false;
  isPay = false;
  occupationModel: ConfigModel[];
  businessCatModel: ConfigModel[];
  upiModel: UpiModel = {
    payeeName: '',
    payeeVpa: '',
    amount: '',
    currency: '',
    transactionNote: ''
  };
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
    private platform: Platform,
    private toastService: ToastService,
    private homeService: HomeService
  ) {
    this.isDetail = true;
    this.storageService.getString(AppConstant.StorageConstant.MemberId).then((data) => {
      this.loggedInUser = data;
    });
    this.getUpiDetails();
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
      } else if (this.userModel.isDocumentApproved && this.userModel.isPaymentApproved && !this.userModel.isPaymentRejected) {
        this.userNotificationMessage1 = AppConstant.NotificationConstant.DoucmentApproved;
        this.showTempUpdateButton = true;
        this.showTempPayButton = false;
        // show pay button
        // show update button
      } else if (this.userModel.isDoucmentRejected && !this.userModel.isDocumentApproved) {
        this.userNotificationMessage1 = AppConstant.NotificationConstant.DocumentRejected;
        this.userNotificationMessage2 = this.userModel.documentRejectReason;
        this.showTempPayButton = true;
        this.showTempUpdateButton = true;
        // not show pay button
        // show update button
      } else if (this.userModel.isDocumentApproved && this.userModel.isPaymentRejected) {
        this.userNotificationMessage1 = AppConstant.NotificationConstant.PaymentRejected;
        this.userNotificationMessage2 = this.userModel.paymentRejectReason;
        this.showTempUpdateButton = false;
        this.showTempPayButton = true;
        // show pay button
        // show update button
      }
      this.getUpdationRequestRaised();
    } else {
      this.getPaymentDetails();
    }
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
      businessSubCategory: new FormControl(null),
      bloodGroup: new FormControl(null, Validators.required),
      bloodDonation: new FormControl(null, Validators.required),
      socialServices: new FormControl(null, Validators.required),
      aadharNumber: new FormControl(null, [Validators.required, Validators.pattern('^([0-9]{12})$')]),
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
    // this.registrationForm.get('occupation').setValue(this.userModel.occupation);
    // this.registrationForm.get('businessCategory').setValue(this.userModel.businessCategory);
    this.registrationForm.get('businessSubCategory').setValue(this.userModel.businessSubCategory);
    this.registrationForm.get('bloodGroup').setValue(this.userModel.bloodGroup.toUpperCase());
    this.registrationForm.get('bloodDonation').setValue(this.userModel.bloodDonation === '1' || this.userModel.bloodDonation === 'YES' ? 'YES' : 'NO');
    this.registrationForm.get('socialServices').setValue(this.userModel.socialServices === '1' || this.userModel.socialServices === 'YES' ? 'YES' : 'NO');
    this.registrationForm.get('dob').setValue(new Date(this.userModel.dob).toDateString());
    this.registrationForm.get('userImageByte').setValue(this.userModel.userImageByte);
    this.registrationForm.get('addressProofByte').setValue(this.userModel.addressProofByte);
    this.registrationForm.get('idProofByte').setValue(this.userModel.idProofByte);
    this.registrationForm.get('memberID').setValue(this.userModel.memberID);
    this.registrationForm.get('id').setValue(this.userModel.id);
    this.registrationForm.get('updatedBy').setValue(this.loggedInUser ? this.loggedInUser : this.userModel.id);
    this.registrationForm.get('updateUserId').setValue(this.userModel.updateUserId);
    this.getOccupation();
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
        this.alertService.presentAlert('User Updated', AlertType.sucess);
        this.closeModal();
      }
      ).catch(data => {
        console.log(data);
      });
    } else {
      this.alertService.presentAlert('Please enter mandatory details', AlertType.error);
    }
  }

  getRegistrationFormData() {
    if (this.registrationForm.valid) {
      this.registrationModel = { ...this.registrationModel, ...this.registrationForm.value };
      if (this.registrationModel) {
        // tslint:disable-next-line: forin
        for (const key in this.registrationModel) {
          if (!(key === 'userImage' || key === 'idProof' || key === 'addressProof')) {
            this.formData.set(key, this.registrationModel[key] === null ? '' : this.registrationModel[key]);
          }
        }
        return this.formData;
      }
    }
    else {
      this.alertService.presentAlert('Please enter mandatory details', AlertType.error);
    }
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

  payAndRaiseUpdate() {
    if (this.registrationForm.valid) {
      const payeeVPA = this.upiModel.payeeVpa;
      const payeeName = this.upiModel.payeeName;
      const payAmount = this.upiModel.amount;
      const transectionNote = this.upiModel.transactionNote;
      const currency = this.upiModel.currency;
      const url = 'upi://pay?pa=' + payeeVPA + '&pn=' + payeeName +
        '&tn=' + transectionNote + '&am=' + payAmount + '&cu=' + currency;
      const option = {
        action: this.webIntent.ACTION_VIEW,
        url
      };
      if (this.platform.is('mobile') && !this.platform.is('android')) {
        const paymentModel: PaymentModel = {
          amount: 100,
          id: 0,
          paymentDoneForTempUserId: this.userModel.updateUserId,
          paymentDoneById: '',
          paymentDoneForMemberId: this.userModel.memberID,
          upiId: '',
          transactionId: '000000000',
          transactionRef: '00000000000',
          mobileNumber: this.registrationForm.get('mobileNumber').value
        };
        const formData = this.getRegistrationFormData();
        this.loginService.updateUser(formData).then((data: any) => {
          this.toastService.presentToast('Please wait updating payment..');
          paymentModel.paymentDoneForTempUserId = this.userModel.updateUserId;
          paymentModel.paymentDoneForMemberId = this.userModel.memberID;
          this.loginService.registerPayment(paymentModel).then((paymentData) => {
            this.alertService.presentAlert('Payment Successfull', AlertType.sucess);
            this.closeModal();
            this.router.navigate(['/home']);
          }).catch((paymentData) => {
            this.alertService.presentAlert('Payment Not Successfull', AlertType.error);
          });
        }).catch(data => {
          this.alertService.presentAlert('Payment Not Successfull', AlertType.error);
        });
      }
      else {
        this.webIntent.startActivityForResult(option).then(Response => {
          console.log(Response);
          if (Response.extras.Status === 'SUCCESS') {
            const paymentModel: PaymentModel = {
              amount: 100,
              id: 0,
              paymentDoneForTempUserId: this.userModel.updateUserId,
              paymentDoneById: '',
              paymentDoneForMemberId: this.userModel.memberID,
              upiId: '',
              transactionId: Response.extras.txnId,
              transactionRef: Response.extras.txnRef,
              mobileNumber: this.registrationForm.get('mobileNumber').value
            };
            const formData = this.getRegistrationFormData();
            this.loginService.updateUser(formData).then(data => {
              this.toastService.presentToast('Please wait updating payment..');
              paymentModel.paymentDoneForTempUserId = this.userModel.updateUserId;
              paymentModel.paymentDoneForMemberId = this.userModel.memberID;
              this.loginService.registerPayment(paymentModel).then((paymentData) => {
                this.alertService.presentAlert('Payment Successfull', AlertType.sucess);
                this.closeModal();
                this.router.navigate(['/home']);
              }).catch((paymentData) => {
                this.alertService.presentAlert('Payment Not Successfull', AlertType.error);
              });
            }).catch(data => {
              this.alertService.presentAlert('Payment Not Successfull', AlertType.error);
            });
          } else if (Response.extras.Status === 'SUBMITTED') {
            console.log('SUBMITTED');
          } else if (Response.extras.Status === 'Failed' || Response.extras.Status === 'FAILURE') {
            console.log('FAILED');
          }
        });
      }
    } else {
      this.alertService.presentAlert('Please enter mandatory details', AlertType.error);
    }
  }

  onDocumentApproval() {
    const profileModel: ProfileStatus = {
      tempUserID: this.userModel.id,
      userType: AppConstant.UserTypeConstant.Approved,
      memberID: null,
      currentProfileStatus: AppConstant.CurrentProfileStatus.DocumentApproved,
      statusChangedBy: this.loggedInUser,
      rejectReason: ''
    };
    this.loginService.changeProfileStatus(profileModel).then(data => {
      this.alertService.presentAlert('Profile Approved', AlertType.sucess);
      this.closeModal();
    }
    ).catch(data => {
      console.log(data);
    });
  }

  onDocumentRejection() {
    if (this.registrationForm.get('rejectReason').value) {
      const profileModel: ProfileStatus = {
        tempUserID: this.userModel.id,
        userType: AppConstant.UserTypeConstant.Rejected,
        memberID: null,
        currentProfileStatus: AppConstant.CurrentProfileStatus.DocumentRejected,
        statusChangedBy: this.loggedInUser,
        rejectReason: this.registrationForm.get('rejectReason').value
      };
      this.loginService.changeProfileStatus(profileModel).then(data => {
        this.alertService.presentAlert('Profile Rejected', AlertType.sucess);
        this.closeModal();
      }
      ).catch(data => {
        console.log(data);
      });
    } else {
      this.alertService.presentAlert('Please enter reject reason', AlertType.error);
    }
  }

  // onPaymentApproval() {
  //   const profileModel: ProfileStatus = {
  //     tempUserID: this.userModel.id,
  //     userType: AppConstant.UserTypeConstant.Approved,
  //     memberID: null,
  //     currentProfileStatus: AppConstant.CurrentProfileStatus.PaymentApproved,
  //     statusChangedBy: this.loggedInUser,
  //     rejectReason: ''
  //   };
  //   this.loginService.changeProfileStatus(profileModel).then(data => {
  //     this.alertService.presentAlert('Payment Approved', AlertType.sucess);
  //     this.closeModal();
  //   }
  //   ).catch(data => {
  //     console.log(data);
  //   });
  // }

  // onPaymentRejection() {
  //   if (this.registrationForm.get('rejectReason').value) {
  //     const profileModel: ProfileStatus = {
  //     tempUserID: this.userModel.id,
  //     userType: AppConstant.UserTypeConstant.Rejected,
  //     memberID: null,
  //     currentProfileStatus: AppConstant.CurrentProfileStatus.PaymentRejected,
  //     statusChangedBy: this.loggedInUser,
  //     rejectReason: this.registrationForm.get('rejectReason').value
  //     };
  //     this.loginService.changeProfileStatus(profileModel).then(data => {
  //       this.alertService.presentAlert('Payment Rejected', AlertType.sucess);
  //       this.closeModal();
  //     }
  //     ).catch(data => {
  //       console.log(data);
  //     });
  //   } else {
  //     this.alertService.presentAlert('Please enter reject reason', AlertType.error);
  //   }
  // }

  onUserUpdateApproval() {
    const updateUserStatusModel: UpdateUserStatusModel = {
      id: this.userModel.id,
      updateUserId: this.userModel.updateUserId,
      isUpdationApproved: true,
      isUpdationRejected: false,
      rejectReason: '',
      statusChangedBy: this.loggedInUser
    };
    this.loginService.changeUpdateUserStatus(updateUserStatusModel).then(data => {
      this.alertService.presentAlert('Profile Approved', AlertType.sucess);
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
        rejectReason: this.registrationForm.get('rejectReason').value,
        statusChangedBy: this.loggedInUser
      };
      this.loginService.changeUpdateUserStatus(updateUserStatusModel).then(data => {
        this.alertService.presentAlert('Profile Rejected', AlertType.sucess);
        this.closeModal();
      }
      ).catch(data => {
        console.log(data);
      });
    } else {
      this.alertService.presentAlert('Please enter reject reason', AlertType.error);
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
      this.alertService.presentAlertConfirm('Approve', 'Are you sure you want to approve'
        , AlertType.sucess, this.onApproval.bind(this), () => { });
    } else {
      this.alertService.presentAlertConfirm('Reject', 'Are you sure you want to reject',
        AlertType.error, this.onRejection.bind(this), () => { });
    }
  }

  pay() {
    console.log(this.platform);
    if (this.platform.is('mobile') && !this.platform.is('android')) {
      const paymentModel: PaymentModel = {
        amount: 100,
        id: 0,
        paymentDoneForTempUserId: this.userModel.id,
        paymentDoneById: this.userModel.id.toString(),
        paymentDoneForMemberId: 0,
        upiId: '',
        transactionRef: '0000000',
        transactionId: '0000000',
        mobileNumber: this.userModel.mobileNumber
      };
      this.loginService.registerPayment(paymentModel).then((data) => {
        console.log('Payment Successfull');
      }).catch((data) => {
        console.log('Payment not successfull');
      });
    } else {
      const payeeVPA = this.upiModel.payeeVpa;
      const payeeName = this.upiModel.payeeName;
      const payAmount = this.upiModel.amount;
      const transectionNote = this.upiModel.transactionNote;
      const currency = this.upiModel.currency;
      const url = 'upi://pay?pa=' + payeeVPA + '&pn=' + payeeName +
        '&tn=' + transectionNote + '&am=' + payAmount + '&cu=' + currency;
      const option = {
        action: this.webIntent.ACTION_VIEW,
        url
      };
      this.webIntent.startActivityForResult(option).then(Response => {
        console.log(Response);
        if (Response.extras.Status === 'SUCCESS') {
          const paymentModel: PaymentModel = {
            amount: 0,
            id: 0,
            paymentDoneForTempUserId: this.userModel.id,
            paymentDoneById: this.userModel.id.toString(),
            paymentDoneForMemberId: 0,
            upiId: payeeVPA,
            transactionId: Response.extras.txnId,
            transactionRef: Response.extras.txnRef,
            mobileNumber: this.userModel.mobileNumber
          };
          this.loginService.registerPayment(paymentModel).then((data) => {
            this.alertService.presentAlert('Payment Successfull', AlertType.sucess);
            this.closeModal();
            this.router.navigate(['/home']);
          }).catch((data) => {
            console.log('Payment not successfull');
          });
        } else if (Response.extras.Status === 'SUBMITTED') {
          console.log('SUBMITTED');
        } else if (Response.extras.Status === 'Failed' || Response.extras.Status === 'FAILURE') {
          console.log('FAILED');
        }
      });
    }
  }

  getUpdationRequestRaised() {
    this.loginService.getUserUpdateRequest(this.userModel.updateUserId).then((data: any) => {
      if (data) {
        const userDetail: UserModel = data.userDetails;
        if (!userDetail.isProfileUpdationApproved && !userDetail.isProfileUpdationRejected) {
          this.userNotificationMessage2 = AppConstant.NotificationConstant.UpdationPending;
          this.showTempPayButton = false;
          this.showTempUpdateButton = false;
        }
        else if (userDetail.isProfileUpdationApproved) {
          this.userNotificationMessage2 = 'Profile Approved.. Please refresh';
          this.showTempPayButton = false;
          this.showTempUpdateButton = false;
        } else if (userDetail.isProfileUpdationRejected) {
          this.showTempPayButton = true;
          this.showTempUpdateButton = true;
          this.userNotificationMessage2 = userDetail.rejectReason;
        }
      }
    });
  }

  getPaymentDetails() {
    let tempUserID = this.userModel.id;
    if (this.currentUserType === AppConstant.UserTypeConstant.UpdationRequest) {
      tempUserID = this.userModel.updateUserId;
    }
    this.loginService.getAllPayment(tempUserID).then((data: any) => {
      if (data) {
        const allPayment = data.paymentModel as PaymentModel[];
        let totalPayment = 0;
        if (allPayment && allPayment.length > 0) {
          totalPayment = allPayment.reduce((acc, curr) => acc + curr.amount, 0);
        }
        let transactionId = '';
        let transactionRef = '';
        for (const payment of allPayment) {
          transactionId += ' ' + payment.transactionId;
          transactionRef += ' ' + payment.transactionRef;
        }
        // this.userNotificationMessage1 = 'Total Amount Paid: ' + totalPayment;
        if (transactionId !== '' || transactionId !== '') {
        this.userNotificationMessage2 = 'Transaction Ref Id ' + transactionRef + ' Transaction Id: ' + transactionId;
        }
        this.showTempPayButton = false;
        this.showTempUpdateButton = false;
      }
    });
  }
  onOccupationChange(value: string){
    this.getBusinessCategory(value);
  }

  getOccupation() {
    this.storageService.getObject(AppConstant.StorageConstant.Occupation).then((data) => {
      if (data && data != null){
        this.occupationModel = data as any as ConfigModel[];
        this.registrationForm.get('occupation').setValue(this.userModel.occupation);
        this.getBusinessCategory(this.userModel.occupation);
      } else{
        this.homeService.getConfigSectionValue('Occupation', true).then((data2: any) => {
          if (data2 && data2.configValueList){
            this.occupationModel = data2.configValueList as ConfigModel[];
            this.registrationForm.get('occupation').setValue(this.userModel.occupation);
            this.getBusinessCategory(this.userModel.occupation);
            this.storageService.setObject(AppConstant.StorageConstant.Occupation, this.occupationModel);
          }
        });
      }
    }).catch( () => {
      this.homeService.getConfigSectionValue('Occupation', true).then((data: any) => {
        if (data && data.configValueList){
          this.occupationModel = data.configValueList as ConfigModel[];
          this.registrationForm.get('occupation').setValue(this.userModel.occupation);
          this.getBusinessCategory(this.userModel.occupation);
          this.storageService.setObject(AppConstant.StorageConstant.Occupation, this.occupationModel);
        }
      });
    });
  }

  getBusinessCategory(selectedOccupation: string) {
    // const selectedOccupation = this.registrationForm.get('occupation').value;
    this.storageService.getObject(selectedOccupation).then((data) => {
      if (data && data != null){
        this.businessCatModel = data as any as ConfigModel[];
        this.registrationForm.get('businessCategory').setValue(this.userModel.businessCategory);
      } else {
        this.homeService.getConfigSectionValue('BusinessCategory:' + selectedOccupation, true).then((data2: any) => {
          if (data2 && data2.configValueList){
            this.businessCatModel = data2.configValueList as ConfigModel[];
            this.registrationForm.get('businessCategory').setValue(this.userModel.businessCategory);
            this.storageService.setObject(selectedOccupation, this.businessCatModel);
          }
        });
      }
    }).catch(() => {
      this.homeService.getConfigSectionValue('BusinessCategory:' + selectedOccupation, true).then((data: any) => {
        if (data && data.configValueList){
          this.businessCatModel = data.configValueList as ConfigModel[];
          this.registrationForm.get('businessCategory').setValue(this.userModel.businessCategory);
          this.storageService.setObject(selectedOccupation, this.businessCatModel);
        }
      });
    });
  }

  openPreview(image) {
    this.modalService.presentModal(ImageModalPage, { img: image });
  }
}
