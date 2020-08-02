import { Component, OnInit } from '@angular/core';
import { UserModel } from '../interfaces/user-model';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalService } from '../services/modal.service';
import { EditUserDetailPage } from '../edit-user/edit-user-detail';
import { LoadingService } from '../services/loading.service';
import { AppConstant } from '../common/constant';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.page.html',
  styleUrls: ['./users-list.page.scss'],
})
export class UsersListPage implements OnInit {
  usersCopy: UserModel[] = [];
  users: UserModel[] = [];
  usersAvailable: boolean;
  currentUserType = '';
  headerName = 'Users List';
  constructor(private loginService: LoginService,
              private router: Router,
              private storageService: StorageService,
              public sanitizer: DomSanitizer,
              private modalService: ModalService,
              private route: ActivatedRoute,
              private loadingService: LoadingService) {
    this.route.queryParams.subscribe(params => {
      this.getUserByType(params.userType);
    });

    // this.getAllUser();
    // this.usersAvailable = false;
  }

  getUserByType(userType: string){
    switch (userType) {
      case AppConstant.UserTypeConstant.Pending:
        this.getPendingUser();
        break;
      case AppConstant.UserTypeConstant.Approved:
        this.getApprovedUser();
        break;
      case AppConstant.UserTypeConstant.PendingPayment:
        this.getPendingPaymentUser();
        break;
      case AppConstant.UserTypeConstant.Rejected:
        this.getRejectedUser();
        break;
      case AppConstant.UserTypeConstant.UpdationRequest:
        this.getAllUpdationRequest();
        break;
      default:
        break;
    }
  }

  getAllUser() {
    this.loginService.getAllUser().then((data: UserModel[]) => {
      this.users = [{id: 1, firstName: 'Vijay1', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
      , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
    , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
     mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
    , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
    qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
     addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
     paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
    , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  },
    {id: 1, firstName: 'Bhaskar1', lastName: 'Vij', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
        , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
      , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
       mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
      , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
      qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
       addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
       paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
      , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  }];
      this.usersCopy = this.users;
      this.usersAvailable = true;
      this.headerName = 'Approved User List';
    });
  }

  getPendingUser() {
   // this.loadingService.presentLoading();
    this.loginService.getUserByType(AppConstant.UserTypeConstant.Pending).then((data: UserModel[]) => {
      this.users = [{id: 1, firstName: 'Vijay2', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
      , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
    , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
     mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
    , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
    qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
     addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
     paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
    , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  },
    {id: 1, firstName: 'Bhaskar2', lastName: 'Vij', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
        , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
      , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
       mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
      , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
      qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
       addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
       paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
      , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  }];
      this.usersCopy = this.users;
      this.usersAvailable = true;
      this.currentUserType = AppConstant.UserTypeConstant.Pending;
      this.headerName = 'Pending User List';
     // this.loadingService.dimissLoading();
    }).catch(() =>{}
      // this.loadingService.dimissLoading()
    );
  }

  getApprovedUser() {
    // this.loadingService.presentLoading();
    this.loginService.getUserByType('Approved').then((data: UserModel[]) => {
      this.users = [{id: 1, firstName: 'Vijay3', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
      , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
    , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
     mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
    , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
    qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
     addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
     paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
    , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  },
    {id: 1, firstName: 'Bhaskar3', lastName: 'Vij', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
        , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
      , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
       mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
      , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
      qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
       addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
       paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
      , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  }];
      this.usersCopy = this.users;
      this.usersAvailable = true;
      this.currentUserType = AppConstant.UserTypeConstant.Approved;
      this.headerName = 'Approved User List';
     // this.loadingService.dimissLoading();
    }).catch(() => {}
     // this.loadingService.dimissLoading()
    );
  }

  getRejectedUser() {
    this.loginService.getUserByType('Rejected').then((data: UserModel[]) => {
      this.users = [{id: 1, firstName: 'Vijay4', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
      , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
    , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
     mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
    , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
    qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
     addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
     paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
    , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  },
    {id: 1, firstName: 'Bhaskar4', lastName: 'Vij', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
        , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
      , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
       mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
      , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
      qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
       addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
       paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
      , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  }];
      this.usersCopy = this.users;
      this.usersAvailable = true;
      this.currentUserType = AppConstant.UserTypeConstant.Rejected;
      this.headerName = 'Rejected User List';
    });
  }

  getPendingPaymentUser() {
    this.loginService.getUserByType('PaymentPending').then((data: UserModel[]) => {
      this.users = [{id: 1, firstName: 'Vijay5', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
      , careTakerName: 'Vijay5', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
    , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
     mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
    , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
    qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
     addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
     paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
    , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  },
    {id: 1, firstName: 'Bhaskar5', lastName: 'Vij', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
        , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
      , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
       mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
      , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
      qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
       addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
       paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
      , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  }];
      this.usersCopy = this.users;
      this.usersAvailable = true;
      this.currentUserType = AppConstant.UserTypeConstant.PendingPayment;
      this.headerName = 'Payment Pending User List';
    });
  }

  // getPaymentDoneUser() {
  //   this.loginService.getUserByType('PaymentDone').then((data: UserModel[]) => {
  //     this.users = data;
  //     this.usersCopy = data;
  //     this.usersAvailable = true;
  //     this.currentUserType = AppConstant.UserTypeConstant.PaymentDone;
  //   });
  // }
  getAllUpdationRequest() {
    this.loginService.getUserByType('UpdationRequest').then((data: UserModel[]) => {
      this.users = [{id: 1, firstName: 'Vijay6', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
      , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
    , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
     mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
    , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
    qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
     addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
     paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
    , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  },
    {id: 1, firstName: 'Bhaskar6', lastName: 'Vij', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
        , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
      , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
       mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
      , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
      qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
       addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
       paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
      , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  }];
      this.usersCopy = this.users;
      this.usersAvailable = true;
      this.currentUserType = AppConstant.UserTypeConstant.UpdationRequest;
      this.headerName = 'Updation Request User List';
    });
  }
  openPageModal(user: UserModel) {
    this.modalService.presentModal(EditUserDetailPage,
                                  {userModel : user, currentUserType : this.currentUserType },
                                  this.refreshOnModalClose.bind(this));
  }

  refreshOnModalClose(){
    this.getUserByType(this.currentUserType);
    console.log('modal close.. refresh..');
  }
  ngOnInit() {
  }
  async filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      this.users = this.usersCopy;
      return;
    }

    this.users = this.usersCopy.filter(user => {
      const currentUser: any = user;
      if (currentUser.firstName && searchTerm) {
        return (currentUser.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  logOut() {
    this.storageService.removeItem('loggedInUser').then(() =>
      this.router.navigate(['/home'])
    );
  }
}
