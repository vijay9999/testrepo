import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { SelectValueAccessor } from '@ionic/angular/directives/control-value-accessors/select-value-accessor';
import { ModalService } from '../services/modal.service';
import { ContactUsPage } from '../contact-us/contact-us.page';
import { GoverningBodyPage } from '../governing-body/governing-body.page';
import { AppConstant } from '../common/constant';
import { UserModel } from '../interfaces/user-model';
import { LoginService } from '../services/login.service';
import { UserDetailsPage } from '../user-details/user-details.page';
import { EditUserDetailPage } from '../edit-user/edit-user-detail';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { CharityPage } from '../charity/charity.page';
import { AchieverListPage } from '../achiever-list/achiever-list.page';
import { FamousPersonalityPage } from '../famous-personality/famous-personality.page';
import { getMaxListeners } from 'process';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  userName: string;
  userDetails: UserModel;
  showSignUpPage: boolean;
  showDetailsPage: boolean;
  showSignInPage: boolean;
  images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: true,
    slidesperview: 1.5
  };

  constructor(private router: Router, private storageService: StorageService,
              private webIntent: WebIntent, private modalService: ModalService,
              private loginService: LoginService) {
    console.log('Initialized');
  }

  openPreview(image) {
    this.modalService.presentModal(ImageModalPage, { img: image });
  }
  ngOnInit() {
    // getting username from route
    // this.activatedRoute.params.subscribe((params) =>  this.userName = params['userName']);
    // this.storageService.getString(AppConstant.StorageConstant.UserName).then((data) => this.userName = data);
    // this.storageService.getString(AppConstant.StorageConstant.MobileNumber).then((data) => {
    //   this.getUserDetailsByMobile(+data);
    // });
    this.storageService.getString(AppConstant.StorageConstant.UserName).then((data) => this.userName = data);
  }
  ionViewWillEnter() {
    this.storageService.getString(AppConstant.StorageConstant.MobileNumber).then((data) => {
      this.getUserDetailsByMobile(+data);
    });
  }

  logOut() {
    this.router.navigate(['/otp-login']);
  }


  openContactUs() {
    this.modalService.presentModal(ContactUsPage, '');
  }

  openAchieverListPage() {
    this.modalService.presentModal(AchieverListPage, '');
  }
  openFamousPersonalityPage() {
    this.modalService.presentModal(FamousPersonalityPage, '');
  }
  openGoverningBody() {
    this.modalService.presentModal(GoverningBodyPage, '');
  }

  openTempDetailPage() {
    this.modalService.presentModal(EditUserDetailPage, {
      userModel: this.userDetails,
      currentUserType: AppConstant.UserTypeConstant.TempUserDetail
    });
  }

  openCharityPage() {
    this.modalService.presentModal(CharityPage, '');
  }

  getUserDetailsByMobile(mobileNumber: number) {
    this.loginService.getUserByMobile(mobileNumber).then((data: UserModel) => {
      // if (data && data != null) {
      //   this.userDetails = data;
      //   this.showSignUpPage = false;
      //   if (!data.memberID) {
      //     this.showDetailsPage = true;
      //     this.showSignInPage = false;
      //   } else {
      //     this.showSignInPage = true;
      //   }
      // } else {
      //   this.showSignUpPage = true;
      //   this.showDetailsPage = false;
      //   this.showSignInPage = false;
      this.showSignUpPage = true;
      this.showDetailsPage = true;
      this.showSignInPage = true;
      this.userDetails =  {id: 1, firstName: 'Vijay', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
        , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
      , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
       mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
      , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
      qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
       addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
       paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
      , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  };
    });
}
}
