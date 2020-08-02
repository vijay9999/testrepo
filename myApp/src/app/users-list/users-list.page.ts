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
      // for (const eachUser of data) {
      //     console.log(eachUser);
      // }
      this.users = data;
      this.usersCopy = data;
      this.usersAvailable = true;
      this.headerName = 'Approved User List';
    });
  }

  getPendingUser() {
   // this.loadingService.presentLoading();
    this.loginService.getUserByType(AppConstant.UserTypeConstant.Pending).then((data: UserModel[]) => {
      this.users = data;
      this.usersCopy = data;
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
      this.users = data;
      this.usersCopy = data;
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
      this.users = data;
      this.usersCopy = data;
      this.usersAvailable = true;
      this.currentUserType = AppConstant.UserTypeConstant.Rejected;
      this.headerName = 'Rejected User List';
    });
  }

  getPendingPaymentUser() {
    this.loginService.getUserByType('PaymentPending').then((data: UserModel[]) => {
      this.users = data;
      this.usersCopy = data;
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
      this.users = data;
      this.usersCopy = data;
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
