import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterEvent, RouterOutlet, ActivationStart } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { StorageService } from '../services/storage.service';
import { UserModel } from '../interfaces/user-model';
import { AppConstant } from '../common/constant';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  activePath = '';

  pages = [

  ];

  constructor(private router: Router,
              private alertService: AlertSrevice,
              private storageService: StorageService) {
    const currentRouteUrl = this.router.routerState.snapshot.url;
    this.activePath = currentRouteUrl;
    this.storageService.getObject(AppConstant.StorageConstant.LoggedInUser).then((userdetail) => {
      const userDetails: UserModel = userdetail as any;
      if (userDetails.userRole === 'Admin'){
        this.pages = [
          {
            name: 'Admin Profile',
            path: '/menu/admin-user',
            param: ''
          },
          {
            name: 'Pending User',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.Pending
          },
          {
            name: 'Registered User',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.Approved
          },
          {
            name: 'Rejected User',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.Rejected
          },
          {
            name: 'Payment Pending',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.PendingPayment
          },
          {
            name: 'Updation Required',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.UpdationRequest
          },
          {
            name: 'Create User',
            path: '/menu/registration',
            param: ''
          }
        ];
      } else if (userDetails.userRole == null || userDetails.userRole === undefined ||  userDetails.userRole === 'User'){
        this.pages = [
          {
            name: 'User Details',
            path: '/menu/user-details'
          }
        ];
      } else {
          this.alertService.presentAlert('Some error Occured!!', AlertType.error);
          this.router.navigate(['/home']);
          // this.router.navigate(['/menu/admin-user']);
      }
    });
    // if (currentRouteUrl === '/menu/admin-user' ) {
    //   this.pages = [
    //     {
    //       name: 'Admin Profile',
    //       path: '/menu/admin-user'
    //     },
    //     {
    //       name: 'Users List',
    //       path: '/menu/users-list'
    //     },
    //     {
    //       name: 'Create User',
    //       path: '/menu/registration'
    //     }
    //   ];
    // }
    //  else if (currentRouteUrl === '/menu/user-details') {
    //   this.pages = [
    //     {
    //       name: 'User Details',
    //       path: '/menu/user-details'
    //     }
    //   ];
    // }
    //  else{
    //   this.alertService.presentAlert('Some error Occured!!', AlertType.error);
    //   this.router.navigate(['/home']);
    //   // this.router.navigate(['/menu/admin-user']);
    // }
  }

  ngOnInit(): void {
  }

    onClick(url, param){
      this.router.navigate([url], { queryParams: param ? { userType: param } : {} });
    }
}
