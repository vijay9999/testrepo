// my-modal.page.ts
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { HomeService } from '../services/home.service';
import { GoverningBody } from '../interfaces/governing-body';
import { UserListModel } from '../interfaces/user-list-model';

@Component({
    selector: 'app-governing-body-modal',
    templateUrl: './governing-body.page.html',
    styleUrls: ['./governing-body.page.scss'],
})
export class GoverningBodyPage implements OnInit {
    public usersModel: UserListModel[] = [];
    public isDataRecieved = false;
    constructor(private modalService: ModalService,
                private homeService: HomeService) {
        // this.isDetail = true;
       // this.isDataRecieved = false;

    }

    ngOnInit() {
        this.getGoverningBody();
    }

    getGoverningBody() {
        this.homeService.getGoverningBody().then((data: UserListModel[]) => {
            this.usersModel = data;
            this.isDataRecieved = true;
        });
    }

    async closeModal() {
        const onClosedData = 'Wrapped Up!';
        await this.modalService.dismiss(onClosedData);
    }

}
