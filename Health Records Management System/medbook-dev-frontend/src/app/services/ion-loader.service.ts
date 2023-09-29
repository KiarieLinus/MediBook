import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root',
})
export class IonLoaderService {
  constructor(private loadingController: LoadingController) {}

  // Present loader
  presentLoader() {
    this.loadingController
      .create({
        message: 'Loading...',
      })
      .then((response) => {
        response.present();
      });
  }
  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().catch((err) => {
      console.log('Error occured : ', err);
    });
  }
}
