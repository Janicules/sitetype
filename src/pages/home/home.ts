import { AppServiceProvider } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
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
}
