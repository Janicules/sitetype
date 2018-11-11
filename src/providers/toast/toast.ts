import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ToastProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastProvider {

  constructor(private toastCtrl: ToastController) {
  }

  //Function to display a little text 
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }
}
