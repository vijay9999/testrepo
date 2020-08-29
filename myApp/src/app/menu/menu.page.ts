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
          // {
          //   name: 'Approve Payment',
          //   path: '/menu/users-list',
          //   param: AppConstant.UserTypeConstant.PaymentDone
          // },
          {
            name: 'Rejected User',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.Rejected
          },
          {
            name: 'Updation Request User',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.UpdationRequest
          },
          {
            name: 'Registered User',
            path: '/menu/users-list',
            param: AppConstant.UserTypeConstant.Approved
          },
          // {
          //   name: 'Payment Pending',
          //   path: '/menu/users-list',
          //   param: AppConstant.UserTypeConstant.PendingPayment
          // },
          {
            name: 'Create User',
            path: '/menu/registration',
            param: 'Admin'
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
          this.alertService.presentAlert('Some error Occured', AlertType.error);
          this.router.navigate(['/home']);
          // this.router.navigate(['/menu/admin-user']);
      }
    });
  }

  ngOnInit(): void {
  }

    onClick(url, param){
      this.router.navigate([url], { queryParams: param ? { userType: param } : {} });
    }
}
