import { Injectable, Component, ComponentRef } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isActive: boolean;
  constructor(public modalController: ModalController) {

  }

  async presentModal(componentPage: any, componentParam: any, callBackMethod?: any) {
    const modal = await this.modalController.create({
      component: componentPage,
      cssClass: 'my-custom-class',
      componentProps: { param: componentParam }
    });
    // Get the data returned from the Modal and add to global variable
    modal.onDidDismiss().then((modalData) => {
      this.isActive = false;
      // this.finalModalData = modalData.data;

      // Run check updates when modal returns
      // this.checkForUpdates();
      if (callBackMethod) {
        callBackMethod();
      }
    });
    this.isActive = true;
    return await modal.present();
  }

  dismiss(paramData: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.isActive = false;
    this.modalController.dismiss(paramData);
  }
}
