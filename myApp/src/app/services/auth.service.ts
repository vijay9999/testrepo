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
                    userDetail = {id: 1, firstName: 'Vijay', lastName: 'Sain', address: 'Rajasthan' , aadharNumber: 10000, email: 'vijay.sain@gmail.com'
                    , careTakerName: 'Vijay', gender: 'M', bloodGroup: 'AB+', dob: '28-08-1991', bloodDonation: 'YES', businessCategory: 'TBD'
                  , businessSubCategory: 'TBD' , isDocumentApproved: true, isDoucmentRejected: false, isPaymentApproved: false,
                   mobileNumber: 1234567890, userRole: 'Admin', occupation: 'BS'
                  , panNumber: 1000, whatsAppNumber: 1234567890, memberID: 1001,
                  qualification: 'HS', socialServices: 'YES', wardNumber: '14', createdBy: 'Admin', addressProof: null,
                   addressProofByte: null, approvedBy: 'Admin', dateOfRegister: new Date('08-07-2020'),
                   paymentStatus: null, idProof: null, idProofByte: null, isPaymentDone: false
                  , isProfileApproved: false, isProfileUpdationRequired: false, updateUserId: 1001, userImage: null, userImageByte: null  };
                  
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
