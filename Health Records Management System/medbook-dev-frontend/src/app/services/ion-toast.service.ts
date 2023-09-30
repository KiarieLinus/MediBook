import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class IonToastService {
  constructor(private toastController: ToastController) {}

  showToast(toastMessage: string) {
    this.toastController
      .create({
        message: toastMessage,
        duration: 3000,
        position: 'bottom',
      })
      .then((response) => {
        response.present();
      });
  }
}
