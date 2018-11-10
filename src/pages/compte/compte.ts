import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { HomePage } from '../home/home';
import { CreationcomptePage } from '../creationcompte/creationcompte';
import { MdpoubliePage } from '../mdpoublie/mdpoublie';
import { PanierPage } from '../panier/panier';

/**
 * Generated class for the ComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-compte',
  templateUrl: 'compte.html',
})
export class ComptePage {
  
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
    this.navCtrl.setRoot(HomePage, {choix: selected});
  }
  redirectionInscription() {
    this.navCtrl.setRoot(CreationcomptePage, {choix: this.choix});
  }
  redirectionMdp() {
    this.navCtrl.setRoot(MdpoubliePage, {choix: this.choix});
  }
  redirectionPanier() {
    this.navCtrl.setRoot(PanierPage, {choix: this.choix});
  }
}
