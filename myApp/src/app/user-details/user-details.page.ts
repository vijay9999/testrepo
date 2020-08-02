import { Component, OnInit, Sanitizer } from '@angular/core';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AlertSrevice, AlertType } from '../services/alert.service';
import { UserModel } from '../interfaces/user-model';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { AppConstant } from '../common/constant';
import { NavParams, PopoverController } from '@ionic/angular';
import { ModalService } from '../services/modal.service';
import { ImagePopOverComponent } from '../image-popover/image-popover.page';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage {
  private userImage;
  private userModel: UserModel;
  dataAvailable = false;
  payeeVPA: string;
  payeeName: string;

  transectionReference: string;

  constructor(private loginService: LoginService,
              private storageService: StorageService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private alertService: AlertSrevice,
              private popOverController: PopoverController) {
    this.storageService.getObject(AppConstant.StorageConstant.LoggedInUser)
      .then((data) => {
        if (data != null) {
          this.userModel = data as any as UserModel;
          this.dataAvailable = true;
        } else {
          this.alertService.presentAlert('Please Login Again!!', AlertType.error);
          this.router.navigate(['/login']);
        }
      }).catch(() => {
        this.alertService.presentAlert('Please Login Again!!', AlertType.error);
        this.router.navigate(['/login']);
      });
  }

  logOut() {
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
