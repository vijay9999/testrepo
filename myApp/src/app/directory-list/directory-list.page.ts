import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { HomeService } from '../services/home.service';
import { UserListModel } from '../interfaces/user-list-model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-directory-list',
  templateUrl: './directory-list.page.html',
  styleUrls: ['./directory-list.page.scss'],
})
export class DirectoryListPage implements OnInit {
  usersModel: UserListModel[] = [];
  constructor(private modalService: ModalService,
              private homeService: HomeService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.getDirectoryList();
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }

  getDirectoryList() {
    this.loginService.getUserByType('Approved').then((data: UserListModel[]) => {
        this.usersModel = data;
    });
}
}
