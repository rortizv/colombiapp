import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController, LoadingController } from '@ionic/angular/standalone';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  async presentToast(message: string = '', cssClass: string = '') {
    try {
      const toast = await this.toastController.create({
        message: message,
        duration: 1500,
        position: 'bottom',
        cssClass: cssClass
      });

      await toast.present();
    } catch (error) {
      console.error('Error presenting toast:', error);
    }
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  public async handleErrorToast(message: string, error: any) {
    console.error(message, error);
    await this.dismissLoading();
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  public async dismissLoading() {
    await this.loadingController.dismiss();
  }

}
