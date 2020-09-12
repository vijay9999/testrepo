import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { HomeService } from '../services/home.service';
import { UserListModel } from '../interfaces/user-list-model';
import { LoginService } from '../services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserModel } from '../interfaces/user-model';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.page.html',
  styleUrls: ['./directory-list.page.scss'],
})
export class DirectoryListPage implements OnInit {
  usersModel: UserModel[] = [];
  usersModelCopy: UserModel[] = [];
  constructor(private modalService: ModalService,
              private homeService: HomeService,
              private loginService: LoginService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getDirectoryList();
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }
  sortByName(a, b){
    if (a.firstName < b.firstName) { return -1; }
    if (a.firstName > b.firstName) { return 1; }
    return 0;
  }

  getDirectoryList() {
    this.loginService.getDirectory().then((data: UserModel[]) => {
      data = data.sort(this.sortByName);
      this.usersModel = data;
      this.usersModelCopy = data;
    });
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      this.usersModel = this.usersModelCopy;
      return;
    }

    this.usersModel = this.usersModelCopy.filter(user => {
      const currentUser: any = user;
      if (currentUser.firstName && searchTerm) {
        return (currentUser.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                || currentUser.lastName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }
}
