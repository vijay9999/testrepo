import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserModel } from '../interfaces/user-model';
import { LoginService } from '../services/login.service';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AppConstant } from '../common/constant';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { Platform } from '@ionic/angular';
import { PaymentModel } from '../interfaces/payment-model';
import { ToastService } from '../services/toast.service';
import { HomeService } from '../services/home.service';
import { IfStmt } from '@angular/compiler';
import { ConfigModel } from '../interfaces/configuration-model';
import { UpiModel } from '../interfaces/upi-model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registrationForm: FormGroup;
  registrationModel: UserModel;
  formData: FormData;
  isAdmin = false;
  occupationModel: ConfigModel[];
  businessCatModel: ConfigModel[];
  upiModel: UpiModel = {
    payeeName: '',
    payeeVpa: '',
    amount: '',
    currency: '',
    transactionNote: ''
  };
  constructor(private loginService: LoginService,
              private alertService: AlertSrevice,
              private router: Router,
              private route: ActivatedRoute,
              private storageService: StorageService,
              private webIntent: WebIntent,
              private platform: Platform,
              private toastService: ToastService,
              private homeService: HomeService) {
                this.getOccupation();
                this.getUpiDetails();
               }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.userType && params.userType === 'Admin') {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
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
      userImage: new FormControl(null, Validators.required),
      idProof: new FormControl(null, Validators.required),
      addressProof: new FormControl(null, Validators.required),
      termsCondition: new FormControl(null, Validators.required)
    });
    this.setDefaultSelectedValue();
    // this.seedData();
    this.formData = new FormData();
  }

  seedData() {
    this.registrationForm.get('firstName').setValue('Manish');
    this.registrationForm.get('lastName').setValue('Prasad');
    this.registrationForm.get('email').setValue('manish.prasad@gmail.com');
    // const dob = new Date(new Date().setFullYear(new Date().getFullYear())).toISOString();
    //  this.registrationForm.get('dob').setValue();
    this.registrationForm.get('careTakerName').setValue('Manish');
    this.registrationForm.get('mobileNumber').setValue(7840058008);
    this.registrationForm.get('whatsappNumber').setValue(7840058008);
    this.registrationForm.get('address').setValue('Gurgaon');
    this.registrationForm.get('aadharNumber').setValue('1234567');
    this.registrationForm.get('panNumber').setValue('123456');
    this.registrationForm.get('wardNumber').setValue('12');
  }

  setDefaultSelectedValue() {
    this.registrationForm.get('gender').setValue('M');
    this.registrationForm.get('qualification').setValue('HS');
    // this.registrationForm.get('businessCategory').setValue('NA');
    // this.registrationForm.get('businessSubCategory').setValue('NA');
    this.registrationForm.get('bloodGroup').setValue('AB+');
    this.registrationForm.get('bloodDonation').setValue('YES');
    this.registrationForm.get('socialServices').setValue('YES');
    if (!this.isAdmin) {
      this.storageService.getString(AppConstant.StorageConstant.MobileNumber)
        .then((data) => {
          this.registrationForm.get('mobileNumber').setValue(+data);
        });
    }
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

    // const reader = new FileReader();

    // reader.readAsArrayBuffer(file);

    // reader.onload = () => {

    //   // get the blob of the image:
    //   const blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);

    //   // create blobURL, such that we could use it in an image element:
    //   const blobURL: string = URL.createObjectURL(blob);

    // };

    // reader.onerror = (error) => {

    //   // handle errors

    // };
  }

  // pay() {
  //   console.log(this.platform);
  //   if (this.platform.is('mobile') && !this.platform.is('android')) {
  //     const paymentModel: PaymentModel = {
  //       amount: 100,
  //       id: 0,
  //       paymentDoneForTempUserId: this.userModel.id,
  //       paymentDoneById: this.userModel.id.toString(),
  //       paymentDoneForMemberId: 0,
  //       upiId: '',
  //       transactionRef: '',
  //       transactionId: ''
  //     };
  //     this.loginService.registerPayment(paymentModel).then((data) => {
  //       console.log('Payment Successfull');
  //     }).catch((data) => {
  //       console.log('Payment not successfull');
  //     });
  //   } else {

  //   }
  // }

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

  payAndRegister() {
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
          amount: 0,
          id: 0,
          paymentDoneForTempUserId: 0,
          paymentDoneById: '',
          paymentDoneForMemberId: 0,
          upiId: '',
          transactionId: '000000000',
          transactionRef: '00000000000',
          mobileNumber: this.registrationForm.get('mobileNumber').value
        };
        const formData = this.getRegistrationFormData();
        this.loginService.registerUser(formData).then((data: any) => {
          this.toastService.presentToast('User Registered.. Please wait updating payment');
          paymentModel.paymentDoneForTempUserId = data.id;
          this.loginService.registerPayment(paymentModel).then((paymentData) => {
            this.alertService.presentAlert('Registration Successfull', AlertType.sucess);
            this.router.navigate(['/home']);
          }).catch((paymentData) => {
            this.alertService.presentAlert('Registration Not Successfull', AlertType.error);
          });
        }).catch(data => {
          this.alertService.presentAlert('Registration Not Successfull', AlertType.error);
        });
      }
      else {
        this.webIntent.startActivityForResult(option).then(Response => {
          console.log(Response);
          if (Response.extras.Status === 'SUCCESS') {
            const paymentModel: PaymentModel = {
              amount: 0,
              id: 0,
              paymentDoneForTempUserId: 0,
              paymentDoneById: '',
              paymentDoneForMemberId: 0,
              upiId: '',
              transactionId: Response.extras.txnId,
              transactionRef: Response.extras.txnRef,
              mobileNumber: this.registrationForm.get('mobileNumber').value
            };
            const formData = this.getRegistrationFormData();
            this.loginService.registerUser(formData).then((data: any) => {
              this.toastService.presentToast('User Registered.. Please wait updating payment');
              paymentModel.paymentDoneForTempUserId = data.id;
              this.loginService.registerPayment(paymentModel).then((paymentData) => {
                this.alertService.presentAlert('Registration Successfull', AlertType.sucess);
                this.router.navigate(['/home']);
              }).catch((paymentData) => {
                this.alertService.presentAlert('Registration Not Successfull', AlertType.error);
              });
            }).catch(data => {
              this.alertService.presentAlert('Registration Not Successfull', AlertType.error);
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

  registerUser() {
    const formData = this.getRegistrationFormData();
    this.loginService.registerUser(formData).then(data => {
      this.alertService.presentAlert('Registered Successfully', AlertType.sucess);
      if (this.isAdmin) {
        // this.router.routerState.snapshot.url === '/menu/registration'
        this.router.navigate(['/menu/admin-user']);
      } else {
        this.router.navigate(['/home']);
      }
    }
    ).catch(data => {
      console.log(data);
    });
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

  onOccupationChange(value: string){
    this.getBusinessCategory(value);
  }

  getOccupation() {
    this.storageService.getObject(AppConstant.StorageConstant.Occupation).then((data) => {
      if (data && data != null){
        this.occupationModel = data as any as ConfigModel[];
        this.registrationForm.get('occupation').setValue(this.occupationModel[0].key);
        this.getBusinessCategory(this.occupationModel[0].key);
      } else{
        this.homeService.getConfigSectionValue('Occupation', true).then((data2: any) => {
          if (data2 && data2.configValueList){
            this.occupationModel = data2.configValueList as ConfigModel[];
            this.registrationForm.get('occupation').setValue(this.occupationModel[0].key);
            this.getBusinessCategory(this.occupationModel[0].key);
            this.storageService.setObject(AppConstant.StorageConstant.Occupation, this.occupationModel);
          }
        });
      }
    }).catch( () => {
      this.homeService.getConfigSectionValue('Occupation', true).then((data: any) => {
        if (data && data.configValueList){
          this.occupationModel = data.configValueList as ConfigModel[];
          this.registrationForm.get('occupation').setValue(this.occupationModel[0].key);
          this.getBusinessCategory(this.occupationModel[0].key);
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
        this.registrationForm.get('businessCategory').setValue('NAA');
      } else {
        this.homeService.getConfigSectionValue('BusinessCategory:' + selectedOccupation, true).then((data2: any) => {
          if (data2 && data2.configValueList){
            this.businessCatModel = data2.configValueList as ConfigModel[];
            this.registrationForm.get('businessCategory').setValue('NAA');
            this.storageService.setObject(selectedOccupation, this.businessCatModel);
          }
        });
      }
    }).catch(() => {
      this.homeService.getConfigSectionValue('BusinessCategory:' + selectedOccupation, true).then((data: any) => {
        if (data && data.configValueList){
          this.businessCatModel = data.configValueList as ConfigModel[];
          this.registrationForm.get('businessCategory').setValue('NAA');
          this.storageService.setObject(selectedOccupation, this.businessCatModel);
        }
      });
    });
  }
}
