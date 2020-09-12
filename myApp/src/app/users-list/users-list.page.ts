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
import { PopoverController } from '@ionic/angular';
import { SmsPopOverPage } from '../sms-popover/sms-popover.page';
import { HomeService } from '../services/home.service';

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
  uniqueMobUserLength: number;
  userSmsList = [];
  selectAllChk = {
    isChecked : false
  };
  constructor(private loginService: LoginService,
              private router: Router,
              private storageService: StorageService,
              public sanitizer: DomSanitizer,
              private modalService: ModalService,
              private route: ActivatedRoute,
              private loadingService: LoadingService,
              private popOverController: PopoverController,
              private homeService: HomeService) {
    this.route.queryParams.subscribe(params => {
      this.usersAvailable = false;
      this.getUserByType(params.userType);
      this.userSmsList = [];
      this.selectAllChk.isChecked = false;
    });
    
    // this.getAllUser();
    // this.usersAvailable = false;
  }

  getUserByType(userType: string) {
    switch (userType) {
      case AppConstant.UserTypeConstant.Pending:
        this.getPendingUser();
        break;
      case AppConstant.UserTypeConstant.Approved:
        this.getApprovedUser();
        break;
      // case AppConstant.UserTypeConstant.PendingPayment:
      //   this.getPendingPaymentUser();
      //   break;
      // case AppConstant.UserTypeConstant.PaymentDone:
      //     this.getPaymentDoneUser();
      //     break;
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
      // for (const eachUser of data) {
      //     console.log(eachUser);
      // }
      this.users = data;
      this.usersCopy = data;
      if (this.users && this.users.length > 0){
        this.usersAvailable = true;
        this.uniqueMobUserLength =
         this.users.filter((thing, i, arr) => arr.findIndex(t => t.mobileNumber === thing.mobileNumber) === i).length;
      }
      this.headerName = 'Approved User List';
    });
  }

  getPendingUser() {
    // this.loadingService.presentLoading();
    this.loginService.getUserByType(AppConstant.UserTypeConstant.Pending).then((data: UserModel[]) => {
      this.users = data;
      this.usersCopy = data;
      if (this.users && this.users.length > 0){
        this.usersAvailable = true;
        this.uniqueMobUserLength =
         this.users.filter((thing, i, arr) => arr.findIndex(t => t.mobileNumber === thing.mobileNumber) === i).length;
      }
      this.currentUserType = AppConstant.UserTypeConstant.Pending;
      this.headerName = 'Pending Users';
      // this.loadingService.dimissLoading();
    }).catch(() => { }
      // this.loadingService.dimissLoading()
    );
  }

  getApprovedUser() {
    // this.loadingService.presentLoading();
    this.loginService.getUserByType('Approved').then((data: UserModel[]) => {
      this.users = data;
      this.usersCopy = data;
      if (this.users && this.users.length > 0){
        this.usersAvailable = true;
        this.uniqueMobUserLength =
         this.users.filter((thing, i, arr) => arr.findIndex(t => t.mobileNumber === thing.mobileNumber) === i).length;
      }
      this.currentUserType = AppConstant.UserTypeConstant.Approved;
      this.headerName = 'Approved Users';
      // this.loadingService.dimissLoading();
    }).catch(() => { }
      // this.loadingService.dimissLoading()
    );
  }

  getRejectedUser() {
    this.loginService.getUserByType('Rejected').then((data: UserModel[]) => {
      this.users = data;
      this.usersCopy = data;
      if (this.users && this.users.length > 0){
        this.usersAvailable = true;
        this.uniqueMobUserLength =
         this.users.filter((thing, i, arr) => arr.findIndex(t => t.mobileNumber === thing.mobileNumber) === i).length;
      }
      this.currentUserType = AppConstant.UserTypeConstant.Rejected;
      this.headerName = 'Rejected Users';
    });
  }

  // getPendingPaymentUser() {
  //   this.loginService.getUserByType('PaymentPending').then((data: UserModel[]) => {
  //     this.users = data;
  //     this.usersCopy = data;
  //     this.usersAvailable = true;
  //     this.currentUserType = AppConstant.UserTypeConstant.PendingPayment;
  //     this.headerName = 'Payment Pending Users';
  //   });
  // }

  // getPaymentDoneUser() {
  //   this.loginService.getUserByType('PaymentDone').then((data: UserModel[]) => {
  //     this.users = data;
  //     this.usersCopy = data;
  //     this.usersAvailable = true;
  //     this.currentUserType = AppConstant.UserTypeConstant.PaymentDone;
  //     this.headerName = 'Payment Recieved Users';
  //   });
  // }
  getAllUpdationRequest() {
    this.loginService.getUserByType('UpdationRequest').then((data: UserModel[]) => {
      this.users = data;
      this.usersCopy = data;
      if (this.users && this.users.length > 0){
        this.usersAvailable = true;
        this.uniqueMobUserLength =
         this.users.filter((thing, i, arr) => arr.findIndex(t => t.mobileNumber === thing.mobileNumber) === i).length;
      }
      this.currentUserType = AppConstant.UserTypeConstant.UpdationRequest;
      this.headerName = 'Updation Request Users';
    });
  }
  openPageModal(user: UserModel) {
    this.modalService.presentModal(EditUserDetailPage,
      { userModel: user, currentUserType: this.currentUserType },
      this.refreshOnModalClose.bind(this));
  }

  refreshOnModalClose() {
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

  addUserToSms(isChecked: boolean, userMobilenumber: string) {
    if (isChecked) {
      if (!this.userSmsList.find(mob => mob === userMobilenumber)) {
        this.userSmsList.push(userMobilenumber);
        if (this.userSmsList.length === this.uniqueMobUserLength){
          this.selectAllChk.isChecked = true;
        }
      }
    } else {
      const index = this.userSmsList.indexOf(userMobilenumber);
      if (index > -1) {
        this.userSmsList.splice(index, 1);
        this.selectAllChk.isChecked = false;
      }
    }
    // console.log(this.userSmsList);
  }

  async openSms() {

    const popover = await this.popOverController.create({
      component: SmsPopOverPage,
      componentProps: {
        title: 'SMS',
        sub: '',
        userSmsList: this.userSmsList
      },
      translucent: true,
      backdropDismiss: false
    });
    return await popover.present();
  }

  logOut() {
    this.storageService.removeItem('loggedInUser').then(() =>
      this.router.navigate(['/home'])
    );
  }
  selectAll(isChecked: boolean) {
    for (const user of this.users) {
      if (isChecked) {
        user.isChecked = true;
       // this.addUserToSms(true, user.mobileNumber.toString());
      } else {
        user.isChecked = false;
      //  this.addUserToSms(false, user.mobileNumber.toString());
      }
    }
     // // this.selectAllChk.isChecked = !isChecked;
    //  console.log(event);
  }

}
