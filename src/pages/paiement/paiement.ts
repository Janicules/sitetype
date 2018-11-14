import { ToastProvider } from './../../providers/toast/toast';
import { PanierPage } from './../panier/panier';
import { HomePage } from './../home/home';
import { GateauPage } from './../gateau/gateau';
import { PlatPage } from './../plat/plat';
import { ComptePage } from './../compte/compte';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { CreationcomptePage } from '../creationcompte/creationcompte';

/**
 * Generated class for the PaiementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paiement',
  templateUrl: 'paiement.html',
})
export class PaiementPage {

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variable to get the cart 
  panier: any = [];
  total: number;

  //Variables for the payment
  card: number;
  month: number;
  year: number;
  cvv: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastService: ToastProvider) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
    this.panier = this.navParams.get('panier');
    this.total = this.navParams.get('total');
  }

  //Function to pay
  payer() {
    if (!this.card || this.card.toString().length != 16 || isNaN(this.card)) {
      this.toastService.presentToast("Le numéro de la carte est incorrecte, il doit faire 16 chiffres");
      return;
    }
    if (!this.cvv || this.cvv.toString().length != 3 || isNaN(this.cvv)) {
      this.toastService.presentToast("Le cryptogramme est incorrecte, il doit faire 3 chiffres");
      return;
    }

    //TODO Add stripes when more info from enterprise

  }

  //Function to redirect the user to other pages
  redirectionMonCompte() {
    this.navCtrl.setRoot(ComptePage, { choix: this.choix });
  }
  redirectionContacteznous() {
    this.navCtrl.setRoot(ContacteznousPage, { choix: this.choix });
  }
  redirectionPlats() {
    this.navCtrl.setRoot(PlatPage, { choix: this.choix });
  }
  redirectionGateau() {
    this.navCtrl.setRoot(GateauPage, { choix: this.choix });
  }
  redirectionHome(selected: string) {
    this.navCtrl.setRoot(HomePage, { choix: selected });
  }
  redirectionPanier() {
    this.navCtrl.setRoot(PanierPage, { choix: this.choix });
  }
  redirectionInscription() {
    this.navCtrl.setRoot(CreationcomptePage, { choix: this.choix });
  }
}
