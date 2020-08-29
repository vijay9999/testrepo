import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { LoginService } from '../services/login.service';
import { UserListModel } from '../interfaces/user-list-model';
import { UserModel } from '../interfaces/user-model';

@Component({
  selector: 'app-business-search',
  templateUrl: './business-search.page.html',
  styleUrls: ['./business-search.page.scss'],
})
export class BusinessSearchPage implements OnInit {
  users: UserModel[] = [];
  usersCopy: UserModel[] = [];
  constructor(private modalService: ModalService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getBusinessSearch();
  }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      this.users = this.usersCopy;
      return;
    }

    this.users = this.usersCopy.filter(user => {
      const currentUser: any = user;
      if (currentUser.firstName && searchTerm) {
        return (currentUser.firstName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  getBusinessSearch() {
    this.loginService.getUserByType('Approved').then((data: any[]) => {
      data = [{
        id: 1, firstName: 'Vijay7', lastName: 'Sain', contactNumber: 1234567890,
        designation: 'Manager', userImage: 'gajab.jpg', description: 'Great Manager', isActive: true
      },
      {
        id: 2, firstName: 'Bhaskar7', lastName: 'Vij', contactNumber: 1234567890,
        designation: 'Manager', userImage: 'gajab.jpg', description: 'Great Manager', isActive: true
      }];
      this.users = data;
      this.usersCopy = data;
    });
  }
}
