import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ActionSheetService {
  constructor(public actionSheetController: ActionSheetController) {

  }

  async presentLogoutActionSheet(callBack: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Log Out',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Logout',
        role: 'destructive',
        icon: 'log-out',
        handler: () => {
         callBack();
        }
      }]
    });
    await actionSheet.present();
  }
}
