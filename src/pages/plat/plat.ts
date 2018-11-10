import { CommandeProvider } from './../../providers/commande/commande';
import { ToastProvider } from './../../providers/toast/toast';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComptePage } from '../compte/compte';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { GateauPage } from '../gateau/gateau';
import { HomePage } from '../home/home';
import { PanierPage } from '../panier/panier';

/**
 * Generated class for the PlatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-plat',
  templateUrl: 'plat.html',
})
export class PlatPage {

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variables for all dishes :
  plats: any = [
    {
      image: 'assets/imgs/plat1.png',
      title: 'Plat X',
      ingredients: 'Ingrédients Y',
      price: '10€50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/plat2.png',
      title: 'Plat X',
      ingredients: 'Ingrédients Y',
      price: '10€50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/plat3.png',
      title: 'Plat X',
      ingredients: 'Ingrédients Y',
      price: '10€50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/plat4.png',
      title: 'Plat X',
      ingredients: 'Ingrédients Y',
      price: '10€50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastService: ToastProvider, 
    private commandeService: CommandeProvider) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  //Function when we click on the select button 
  addCart(name, price, image) {
    this.toastService.presentToast("Le produit a été ajouté à votre panier");
    this.commandeService.commandArray.push({ name: name, price: price, image: image });
  }

  //Functions to redirect the user to other pages :
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
