import { Component, OnInit } from '@angular/core';
import { UserListModel } from '../interfaces/user-list-model';
import { HomeService } from '../services/home.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-famous-personality',
  templateUrl: './famous-personality.page.html',
  styleUrls: ['./famous-personality.page.scss'],
})
export class FamousPersonalityPage implements OnInit {

  usersModel: UserListModel[] = [];
  isDataRecieved = false;
  constructor(private homeService: HomeService,
              private modalService: ModalService) {
                this.isDataRecieved = false;
                this.getFamousPersonality();
               }

  ngOnInit() {
  }

  getFamousPersonality() {
    this.homeService.getFamousPersonality().then((data: UserListModel[]) => {
        this.usersModel = [{id: 1, firstName: 'Vijay7', lastName: 'Sain', contactNumber: 1234567890,
        designation: 'Manager' , userImage: null,description: 'Great Manager', isActive:true },
      { id: 2, firstName: 'Bhaskar7', lastName: 'Vij', contactNumber: 1234567890,
      designation: 'Manager' , userImage: null,description: 'Great Manager', isActive:true }];
        this.isDataRecieved = true;
    });
}

async closeModal() {
const onClosedData = 'Wrapped Up!';
await this.modalService.dismiss(onClosedData);
}

}
