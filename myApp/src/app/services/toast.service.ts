import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) {}

  async presentToast(toastMessage: string) {
    const toast = await this.toastController.create({
      message: toastMessage,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions(toastHeader: string, toastMessage: string) {
    const toast = await this.toastController.create({
      header: toastHeader,
      message: toastMessage,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}