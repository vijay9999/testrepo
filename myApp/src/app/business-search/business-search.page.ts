import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { LoginService } from '../services/login.service';
import { UserListModel } from '../interfaces/user-list-model';
import { UserModel } from '../interfaces/user-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from '../services/home.service';
import { StorageService } from '../services/storage.service';
import { ConfigModel } from '../interfaces/configuration-model';
import { DomSanitizer } from '@angular/platform-browser';
import { AppConstant } from '../common/constant';

@Component({
  selector: 'app-business-search',
  templateUrl: './business-search.page.html',
  styleUrls: ['./business-search.page.scss'],
})
export class BusinessSearchPage implements OnInit {
  users: UserModel[] = [];
  usersCopy: UserModel[] = [];
  businessForm: FormGroup;
  businessCatModel: ConfigModel[] = [];
  constructor(private modalService: ModalService,
              private loginService: LoginService,
              private homeService: HomeService,
              private storageService: StorageService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.businessCatModel = [];
    this.getBusinessSearch();
    this.businessForm = new FormGroup({
      businessCategory: new FormControl(null),
      businessSubCategory: new FormControl(null)
    });
    this.businessForm.get('businessCategory').setValue('NA');
    this.businessForm.get('businessSubCategory').setValue('NA');
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm || searchTerm === 'All') {
      this.users = this.usersCopy;
      return;
    }

    this.users = this.usersCopy.filter(user => {
      const currentUser: any = user;
      if (currentUser.businessCategory && searchTerm) {
        let searchValue = '';
        const catFound = this.businessCatModel.find(cat => cat.key === searchTerm);
        if (catFound) {
          searchValue = catFound.value;
        } else {
          searchValue = searchTerm;
        }
        return (currentUser.businessCategory.toUpperCase().indexOf(searchValue.toUpperCase()) > -1);
      } else {
        return (currentUser.businessCategory.toUpperCase().indexOf(searchTerm.toUpperCase()) > -1);
      }
    });
  }

  onBusinessCatChange() {
    if (this.businessForm.get('businessCategory').value === 'NA') {
      this.users = this.usersCopy;
      return;
    } else {
      this.users = this.usersCopy.filter(user => {
        const currentUser: any = user;
        if (currentUser.businessCategory) {
          return (currentUser.businessCategory.toUpperCase() === this.businessForm.get('businessCategory').value);
        }
      });
    }
  }

  onBusinessSubCatChange() {
    if (this.businessForm.get('businessSubCategory').value === 'NA') {
      this.users = this.usersCopy;
      return;
    } else {
      this.users = this.usersCopy.filter(user => {
        const currentUser: any = user;
        if (currentUser.businessSubCategory) {
          return (currentUser.businessSubCategory.toUpperCase() === this.businessForm.get('businessSubCategory').value);
        }
      });
    }
  }

  sortByName(a, b) {
    if (a.firstName < b.firstName) { return -1; }
    if (a.firstName > b.firstName) { return 1; }
    return 0;
  }
  getBusinessSearch() {
    this.loginService.getBusinessSearch().then((data: UserModel[]) => {
      data = data.sort(this.sortByName);
      this.storageService.getObject(AppConstant.StorageConstant.AllBusinessCode).then((data2) => {
        if (data2 && data2 != null) {
          this.businessCatModel = data2 as any as ConfigModel[];
          this.businessForm.get('businessCategory').setValue('All');
          for (const user of data) {
            const foundCategory = this.businessCatModel.find(config => config.key === user.businessCategory);
            if (foundCategory) {
              user.businessCategory = foundCategory.value;
            }
          }
          this.users = data;
          this.usersCopy = data;
        } else {
          this.homeService.getConfigSectionValue(AppConstant.StorageConstant.AllBusinessCode, true).then((data3: any) => {
            if (data3 && data3.configValueList) {
              this.businessCatModel = data3.configValueList as ConfigModel[];
              this.storageService.setObject(AppConstant.StorageConstant.AllBusinessCode, this.businessCatModel);
              this.businessForm.get('businessCategory').setValue('All');
              for (const user of data) {
                const foundCategory = this.businessCatModel.find(config => config.key === user.businessCategory);
                if (foundCategory) {
                  user.businessCategory = foundCategory.value;
                }
              }
              this.users = data;
              this.usersCopy = data;
            }
          });
        }
      }).catch(() => {
        this.users = data;
        this.usersCopy = data;
      });
    });
  }

  // getBusinessCategory(user: UserModel) {
  //   // const selectedOccupation = this.registrationForm.get('occupation').value;
  //   this.storageService.getObject(AppConstant.StorageConstant.AllBusinessCode).then((data) => {
  //     if (data && data != null) {
  //       const businessCatModel = data as any as ConfigModel[];
  //       this.businessForm.get('businessCategory').setValue('All');
  //       const foundCategory = businessCatModel.find(config => config.key === user.businessCategory);
  //       if (foundCategory) {
  //         user.businessCategory = foundCategory.value;
  //       }
  //     } else {
  //       this.homeService.getConfigSectionValue(AppConstant.StorageConstant.AllBusinessCode).then((data2: any) => {
  //         if (data2 && data2.configValueList) {
  //           const businessCatModel = data2.configValueList as ConfigModel[];
  //           this.businessForm.get('businessCategory').setValue('All');
  //           this.storageService.setObject(AppConstant.StorageConstant.AllBusinessCode, businessCatModel).then(() =>
  //           {
  //             const foundCategory = businessCatModel.find(config => config.key === user.businessCategory);
  //             if (foundCategory) {
  //               user.businessCategory = foundCategory.value;
  //             }
  //           });
  //         }
  //       });
  //     }
  //   }).catch(() => {
  //   });
  // }
}
