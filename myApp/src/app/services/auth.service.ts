import { Component, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { LoginService } from './login.service';
import { AlertSrevice, AlertType } from './alert.service';
import { Router } from '@angular/router';
import { UserModel } from '../interfaces/user-model';
import { AppConstant } from '../common/constant';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private storageService: StorageService,
                private loginService: LoginService,
                private alertService: AlertSrevice,
                private router: Router) { }

    redirectLoggedInUser() {
        this.storageService.getString(AppConstant.StorageConstant.MemberId)
            .then((data) => {
                this.loginService.getUserByMemberId(+data).then((userDetail: UserModel) => {
                    this.storageService.setObject(AppConstant.StorageConstant.LoggedInUser, userDetail).then(() => {
                        if (userDetail.userRole === 'Admin') {
                            this.router.navigate(['/menu/admin-user']);
                        } else {
                            this.router.navigate(['/menu/user-details']);
                        }
                    });
                });
            }).catch((data) => {
                this.alertService.presentAlert('Some error Occured.. Please login Again!!', AlertType.error);
                this.router.navigate(['/']);
            });
    }
}
