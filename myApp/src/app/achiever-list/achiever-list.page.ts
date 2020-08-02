import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { ModalService } from '../services/modal.service';
import { UserListModel } from '../interfaces/user-list-model';

@Component({
  selector: 'app-achiever-list',
  templateUrl: './achiever-list.page.html',
  styleUrls: ['./achiever-list.page.scss'],
})
export class AchieverListPage implements OnInit {
  usersModel: UserListModel[] = [];
  isDataRecieved = false;
  // formData: FormData;
  constructor(private homeService: HomeService,
    private modalService: ModalService) {
     // this.formData = new FormData();
  }

  ngOnInit() {
    this.getAchieverList();
  }

  getAchieverList() {
    this.homeService.getAchieverList().then((data: UserListModel[]) => {
      this.usersModel = [{id: 1, firstName: 'Vijay6', lastName: 'Sain', contactNumber: 1234567890,
      designation: 'Manager' , userImage: null,description: 'Great Manager', isActive:true },
    { id: 2, firstName: 'Bhaskar', lastName: 'Vij', contactNumber: 1234567890,
    designation: 'Manager' , userImage: null,description: 'Great Manager', isActive:true }];
      this.isDataRecieved = true;
    });
  }

  // loadImageFromDevice(event) {

  //   const files = event.target.files;

  //   const fileToUpload = files[0] as File;

  //   if (event.target.id === 'userImageInput') {
  //     this.formData.append('userImage', fileToUpload, fileToUpload.name);
  //   }
  //   else if (event.target.id === 'idProofInput') {
  //     this.formData.append('idProof', fileToUpload, fileToUpload.name);
  //   }
  //   else if (event.target.id === 'addressProofInput') {
  //     this.formData.append('addressProof', fileToUpload, fileToUpload.name);
  //   }
  // }
  async closeModal() {
    const onClosedData = 'Wrapped Up!';
    await this.modalService.dismiss(onClosedData);
  }

  // addAchieverPic(){
  //   this.formData.set('id', '0');
  //   this.formData.set('name', 'Manish');
  //   this.homeService.addAchiever(this.formData).then(data => {
  //    console.log(data);
  //   }
  //   ).catch(data => {
  //     console.log(data);
  //   });
  // }
}
