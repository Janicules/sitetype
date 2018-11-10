import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComptePage } from "../compte/compte";
import { ContacteznousPage } from "../contacteznous/contacteznous";
import { PlatPage } from "../plat/plat";
import { HomePage } from "../home/home";
import { PanierPage } from '../panier/panier';

/**
 * Generated class for the GateauPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-gateau',
  templateUrl: 'gateau.html',
})
export class GateauPage {

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

  test() {
    console.log("ok");
  }
}
