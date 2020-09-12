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
import { HomeService } from '../services/home.service';
import { ModalService } from '../services/modal.service';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { ConfigModel } from '../interfaces/configuration-model';

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
              private popOverController: PopoverController,
              private homeService: HomeService,
              private modalService: ModalService) { }

  getUserModel() {
    this.storageService.getObject(AppConstant.StorageConstant.LoggedInUser)
      .then((data) => {
        this.adminUserModel = data as any as UserModel;
        this.dataAvailable = true;
        this.getBusinessSearch(this.adminUserModel);
        this.getOccupation(this.adminUserModel);
        this.getQualification(this.adminUserModel);
      }).catch(() => {
        this.alertService.presentAlert('Please Login Again', AlertType.error);
        this.router.navigate(['/login']);
      });
  }

  ngOnInit() {
    this.getUserModel();
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

  openPreview(image) {
    this.modalService.presentModal(ImageModalPage, { img: image });
  }

  getBusinessSearch(userModel: UserModel) {
    let businessCatModel = [];
    this.storageService.getObject(AppConstant.StorageConstant.AllBusinessCode).then((data2) => {
      if (data2 && data2 != null) {
        businessCatModel = data2 as any as ConfigModel[];
        const foundCategory = businessCatModel.find(config => config.key === userModel.businessCategory);
        if (foundCategory) {
          userModel.businessCategory = foundCategory.value;
        }
      } else {
        this.homeService.getConfigSectionValue(AppConstant.StorageConstant.AllBusinessCode, true).then((data3: any) => {
          if (data3 && data3.configValueList) {
            businessCatModel = data3.configValueList as ConfigModel[];
            this.storageService.setObject(AppConstant.StorageConstant.AllBusinessCode, businessCatModel);
            const foundCategory = businessCatModel.find(config => config.key === userModel.businessCategory);
            if (foundCategory) {
              userModel.businessCategory = foundCategory.value;
            }

          }
        });
      }
    }).catch(() => {});
  }

  getOccupation(userModel: UserModel) {
    let occupationModel = [];
    this.storageService.getObject(AppConstant.StorageConstant.Occupation).then((data) => {
      if (data && data != null){
        occupationModel = data as any as ConfigModel[];
        const foundCategory = occupationModel.find(config => config.key === userModel.occupation);
        if (foundCategory) {
          userModel.occupation = foundCategory.value;
        }
      } else{
        this.homeService.getConfigSectionValue(AppConstant.StorageConstant.Occupation, false).then((data2: any) => {
          if (data2 && data2.configValueList){
            occupationModel = data2.configValueList as ConfigModel[];
            this.storageService.setObject(AppConstant.StorageConstant.Occupation, occupationModel);
            const foundCategory = occupationModel.find(config => config.key === userModel.occupation);
            if (foundCategory) {
              userModel.occupation = foundCategory.value;
            }
          }
        });
      }
    }).catch( () => {});
  }

  getQualification(userModel: UserModel) {
    let qualificationModel = [];
    this.storageService.getObject(AppConstant.StorageConstant.Qualification).then((data) => {
      if (data && data != null){
        qualificationModel = data as any as ConfigModel[];
        const foundCategory = qualificationModel.find(config => config.key === userModel.qualification);
        if (foundCategory) {
          userModel.qualification = foundCategory.value;
        }
      } else{
        this.homeService.getConfigSectionValue(AppConstant.StorageConstant.Qualification, false).then((data2: any) => {
          if (data2 && data2.configValueList){
            qualificationModel = data2.configValueList as ConfigModel[];
            this.storageService.setObject(AppConstant.StorageConstant.Qualification, qualificationModel);
            const foundCategory = qualificationModel.find(config => config.key === userModel.qualification);
            if (foundCategory) {
              userModel.qualification = foundCategory.value;
            }
          }
        });
      }
    }).catch( () => {});
  }
}
