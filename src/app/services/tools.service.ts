import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private toastController: ToastController) { }

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

}
