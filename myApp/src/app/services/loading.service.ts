import {Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
  loading: any;
  constructor(public loadingController: LoadingController) {
    this.createLoading();
  }

  async createLoading(loderMessage = 'Please wait...'){
    this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: loderMessage,
        duration: 10000
      });
  }
  async presentLoading(loderMessage?: string) {
    await this.createLoading(loderMessage);
    await this.loading.present();

    // const { role, data } =
  }

  async dimissLoading(){
    if (this.loading){
    await this.loading.dismiss();
    }
    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed with role:', role);
  }
}
