import { AdminPage } from './../admin/admin';
import { RedirectionProvider } from './../../providers/redirection/redirection';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ComptePage } from '../compte/compte';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { PanierPage } from '../panier/panier';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  choix: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private redirectionService: RedirectionProvider) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
    
    if (location.search != "" && !this.redirectionService.redirected) {
      const params = location.search.split("?")[1].split("=");

      for (let i = 0; i < params.length; i++) {
        if (params[i] == "success") {
          this.redirectionService.redirected = true;
          this.presentToast('Paiement avec PayPal réalisé, la commande a été ajoutée avec succès');
          return;
        }
        else if (params[i] == "cancel") {
          this.redirectionService.redirected = true;
          this.presentToast('Paiement avec PayPal annulé');
          return;
        }
      }
    }
  }

  //Function to display a little text 
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 5000,
    });

    toast.present();
  }

  redirectionMonCompte() {
    this.navCtrl.setRoot(ComptePage, {choix: this.choix});
  }

  redirectionContacteznous() {
    this.navCtrl.setRoot(ContacteznousPage, {choix: this.choix});
  }

  redirectionPlats() {
    this.navCtrl.setRoot(PlatPage, {choix: this.choix});
  }

  redirectionGateau() {
    this.navCtrl.setRoot(GateauPage, {choix: this.choix});
  }
  
  redirectionHome(selected: string) {
    this.navCtrl.setRoot(HomePage, {choix: selected});
  }

  redirectionPanier() {
    this.navCtrl.setRoot(PanierPage, {choix: this.choix});
  }

  redirectionAdmin() {
    this.navCtrl.setRoot(AdminPage, {choix: this.choix});
  }
}
