import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string = '', cssClass: string = '') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      cssClass: cssClass
    });

    await toast.present();
  }

}
