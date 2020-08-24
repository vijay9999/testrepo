import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { UserModel } from '../interfaces/user-model';
import { StorageService } from '../services/storage.service';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConstant } from '../common/constant';
import { PopoverController } from '@ionic/angular';
import { ImagePopOverComponent } from '../image-popover/image-popover.page';

@Component({
  selector: 'app-admin-user1',
  templateUrl: './admin-user.page.html',
  styleUrls: ['./admin-user.page.scss'],
})
export class AdminUserPage implements OnInit {
  adminUserModel: UserModel;
  userImage;
  dataAvailable = false;

  constructor(private loginService: LoginService,
              private storageService: StorageService,
              private alertService: AlertSrevice,
              private router: Router,
              private sanitizer: DomSanitizer,
              private popOverController: PopoverController) {}

  getUserModel(){
    this.storageService.getObject(AppConstant.StorageConstant.LoggedInUser)
    .then((data) => {
      this.adminUserModel = data as any as UserModel;
      this.dataAvailable = true;
      try{
        const objectURL = 'data:image/png;base64,' + this.adminUserModel.userImageByte;
        this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }
      catch {
        this.userImage = '../../assets/img/blank_profile.webp';
      }
      // this.loginService.getUserImage(this.adminUserModel.userImageLink).then((imgdata) => {
      //   // this.userImage = imgdata;
      //   const objectURL = 'data:image/png;base64,' + imgdata;
      //   this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      // });
    }).catch(() => {
      this.alertService.presentAlert('Please Login Again', AlertType.error);
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
    this.getUserModel();
  }

  logOut(){
    this.storageService.removeItem('loggedInUser').then(() =>
      this.router.navigate(['/home'])
    );
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
}
