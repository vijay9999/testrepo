import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { SelectValueAccessor } from '@ionic/angular/directives/control-value-accessors/select-value-accessor';
import { ModalService } from '../services/modal.service';
import { ContactUsPage } from '../contact-us/contact-us.page';
import { GoverningBodyPage } from '../governing-body/governing-body.page';
import { AppConstant } from '../common/constant';
import { UserModel } from '../interfaces/user-model';
import { LoginService } from '../services/login.service';
import { UserDetailsPage } from '../user-details/user-details.page';
import { EditUserDetailPage } from '../edit-user/edit-user-detail';
import { ImageModalPage } from '../image-modal/image-modal.page';
import { CharityPage } from '../charity/charity.page';
import { AchieverListPage } from '../achiever-list/achiever-list.page';
import { FamousPersonalityPage } from '../famous-personality/famous-personality.page';
import { ImageGalleryPage } from '../image-gallery/image-gallery.page';
import { DirectoryListPage } from '../directory-list/directory-list.page';
import { BusinessSearchPage } from '../business-search/business-search.page';
import { HomeService } from '../services/home.service';
import { ActionSheetService } from '../services/action-sheet.service';
import { Platform } from '@ionic/angular';
import { MatrimonyPage } from '../matrimony/matrimony.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  userName: string;
  userDetails: UserModel;
  showSignUpPage: boolean;
  showDetailsPage: boolean;
  showSignInPage: boolean;
  mobileNumber: number;
  backButtonSubscription;
  images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg',
  '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpeg', '14.jpg', '15.jpg', '16.jpg'];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: true,
    slidesperview: 1.5
  };
  notificationMessage = '';
  constructor(private router: Router, private storageService: StorageService,
              private webIntent: WebIntent, private modalService: ModalService,
              private loginService: LoginService, private homeService: HomeService,
              private actionSheetService: ActionSheetService,
              private platform: Platform){
            this.getNotificationMessage();
  }

  openPreview(image) {
    this.modalService.presentModal(ImageModalPage, { img: image, type: 'slide' });
  }
  ngOnInit() {
    // getting username from route
    // this.activatedRoute.params.subscribe((params) =>  this.userName = params['userName']);
    // this.storageService.getString(AppConstant.StorageConstant.UserName).then((data) => this.userName = data);
    // this.storageService.getString(AppConstant.StorageConstant.MobileNumber).then((data) => {
    //   this.getUserDetailsByMobile(+data);
    // });
    this.storageService.getString(AppConstant.StorageConstant.UserName).then((data) => this.userName = data);
    this.storageService.getString(AppConstant.StorageConstant.MobileNumber).then((data) => {
      this.mobileNumber = +data;
      this.getUserDetailsByMobile(+data, false);
    });
  }
  ionViewWillEnter() {
    this.showSignUpPage = false;
    this.showDetailsPage = false;
    this.showSignInPage = false;
    // this.storageService.getString(AppConstant.StorageConstant.MobileNumber).then((data) => {
    //   this.getUserDetailsByMobile(+data);
    // });
  }

  logOut() {
    this.router.navigate(['/otp-login']);
  }

  openContactUs() {
    this.modalService.presentModal(ContactUsPage, '');
  }

  openAchieverListPage() {
    this.modalService.presentModal(AchieverListPage, '');
  }
  openFamousPersonalityPage() {
    this.modalService.presentModal(FamousPersonalityPage, '');
  }
  openGoverningBody() {
    this.modalService.presentModal(GoverningBodyPage, '');
  }

  openPhotoGallery() {
    this.modalService.presentModal(ImageGalleryPage, '');
  }

  openDirectoryListPage() {
    this.modalService.presentModal(DirectoryListPage, '');
  }

  openBusinessSearchPage() {
    this.modalService.presentModal(BusinessSearchPage, '');
  }

  openTempDetailPage() {
    this.modalService.presentModal(EditUserDetailPage, {
      userModel: this.userDetails,
      currentUserType: AppConstant.UserTypeConstant.TempUserDetail
    });
    // , this.refreshTabs.bind(this));
  }

  // refreshTabs(){
  //   this.storageService.getString(AppConstant.StorageConstant.MobileNumber).then((data) => {
  //     this.getUserDetailsByMobile(+data);
  //   });
  // }

  openCharityPage() {
    this.modalService.presentModal(CharityPage, '');
  }

  getUserDetailsByMobile(mobileNumber: number, callOpenSignIn: boolean) {
    this.showSignUpPage = false;
    this.showDetailsPage = false;
    this.showSignInPage = false;
    this.loginService.getUserByMobile(mobileNumber, false).then((data: UserModel) => {
      if (data && data != null) {
        this.userDetails = data;
        this.showSignUpPage = false;
        if (!data.memberID) {
          this.showDetailsPage = true;
          this.showSignInPage = false;
        } else {
          this.showSignInPage = true;
          this.showDetailsPage = false;
        }
      } else {
        this.showSignUpPage = true;
        this.showDetailsPage = false;
        this.showSignInPage = false;
      }
      if (callOpenSignIn) {
        this.openSignIn();
      }
    });
  }

  openSignIn() {
    if (this.showSignInPage) {
      this.router.navigate(['/login']);
    } else if (this.showSignUpPage) {
      this.router.navigate(['/registration']);
    } else if (this.showDetailsPage) {
      this.loginService.getUserByMobile(this.mobileNumber, false).then((data: UserModel) => {
        if (data && data != null) {
          this.userDetails = data;
          this.openTempDetailPage();
        }
      });
    } else {
      this.getUserDetailsByMobile(this.mobileNumber, true);
    }
  }

  getNotificationMessage() {
    this.homeService.getConfigValue('HomeNotification', false).then((data: any) => {
      if (data && data.configValue) {
        this.notificationMessage = data.configValue;
      }
    });
  }

  openMatrimonyPage(){
    this.modalService.presentModal(MatrimonyPage, '');
  }

  openAction() {
    this.actionSheetService.presentLogoutActionSheet(this.logOut.bind(this));
  }

  ngAfterViewInit() {
    console.log(this.router.routerState.snapshot.url);
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      if (this.modalService.isActive) {
        this.modalService.dismiss('');
      } else if (this.router.routerState.snapshot.url === '/home') {
        // tslint:disable-next-line: no-string-literal
        navigator['app'].exitApp();
      }
    });
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }
}
