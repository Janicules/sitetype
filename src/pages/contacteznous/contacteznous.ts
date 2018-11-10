import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { ComptePage } from '../compte/compte';
import { HomePage } from '../home/home';
import { PanierPage } from '../panier/panier';

/**
 * Generated class for the ContacteznousPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contacteznous',
  templateUrl: 'contacteznous.html',
})
export class ContacteznousPage {

  choix: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  ionViewDidLoad() {
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
    this.navCtrl.setRoot(HomePage, { choix: selected });
  }
  redirectionPanier() {
    this.navCtrl.setRoot(PanierPage, {choix: this.choix});
  }
}
