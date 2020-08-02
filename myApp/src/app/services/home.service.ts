import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CharityModel } from '../interfaces/charity-model';
import { ToastService } from './toast.service';
import { LoadingService } from './loading.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
   private url = 'http://localhost:59789/api/home/';
  // private url = 'http://192.168.1.3:5555/api/';
  constructor(private httpClient: HttpClient,
              private toastService: ToastService,
              private loadingService: LoadingService) { }
  private responseData;

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.toastService.presentToast(error.error.message);
    } else {
      this.toastService.presentToast(error.error.message);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  handleErrorMessage(error: any) {
    this.loadingService.dimissLoading();
    if (error && error.error) {
      this.toastService.presentToast(error.error.message);
    } else {
      this.toastService.presentToast('Something bad happened; please try again later.');
    }
  }
  getAchieverList(){
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'getAchieverList/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}`).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getGoverningBody(){
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'GetGoverningBody/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}`).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getFamousPersonality(){
    this.loadingService.presentLoading();
    const getUserUrl = this.url + 'getFamousPersonality/';
    const promise = new Promise(resolve => {
      this.httpClient.get(`${getUserUrl}`).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  addCharity(charityModel: CharityModel) {
    this.loadingService.presentLoading();
    const payCharityUrl = this.url + 'addCharity';
    const promise = new Promise(resolve => {
      this.httpClient.post(`${payCharityUrl}`, charityModel).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  addAchiever(achieverForm: FormData) {
    this.loadingService.presentLoading();
    const payCharityUrl = this.url + 'addachiever';
    const promise = new Promise(resolve => {
      this.httpClient.post(`${payCharityUrl}`, achieverForm).subscribe(data => {
        this.loadingService.dimissLoading();
        resolve(data);
      }, (error) => {
        this.handleErrorMessage(error);
      });
    });
    return promise;
  }

  getImage(imageType: string, imageName: string) {
    return 'http://localhost:59789/Resources/Images/' + imageType + '/' + imageName;
  }

}
