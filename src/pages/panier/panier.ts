import { CommandeProvider } from './../../providers/commande/commande';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComptePage } from '../compte/compte';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { HomePage } from '../home/home';

/**
 * Generated class for the PanierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-panier',
  templateUrl: 'panier.html',
})
export class PanierPage {

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variables for the cart :
  panier: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private commandeService: CommandeProvider) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  ionViewWillEnter() {
    this.panier = this.commandeService.commandArray;
  }

  //Remove the product in the array
  removeProduct(index) {
    this.panier.splice(index, 1);
  }

  //Remove a quantity
  removeOne(index) {
    let name = this.commandeService.commandArray[index].name;
    let price = this.commandeService.commandArray[index].price;
    let image = this.commandeService.commandArray[index].image;
    let quantity = this.commandeService.commandArray[index].quantity - 1;

    if (quantity < 1)
      quantity = 1;

    let tmpPrice = price.split("€");
    tmpPrice = tmpPrice[0] + "." + tmpPrice[1];

    let total: any = tmpPrice * quantity;
    let tmpTotal = total.toString().split(".");
    if (tmpTotal.length == 2)
      total = tmpTotal[0] + "€" + tmpTotal[1];
    else
      total = tmpTotal[0] + "€";

    this.commandeService.commandArray[index] = { name: name, price: price, image: image, quantity: quantity, total: total };
  }

  //Add a quantity
  addOne(index) {
    let name = this.commandeService.commandArray[index].name;
    let price = this.commandeService.commandArray[index].price;
    let image = this.commandeService.commandArray[index].image;
    let quantity = this.commandeService.commandArray[index].quantity + 1;

    if (quantity > 20)
      quantity = 20;

    let tmpPrice = price.split("€");
    tmpPrice = tmpPrice[0] + "." + tmpPrice[1];

    let total: any = tmpPrice * quantity;
    let tmpTotal = total.toString().split(".");
    if (tmpTotal.length == 2)
      total = tmpTotal[0] + "€" + tmpTotal[1];
    else
      total = tmpTotal[0] + "€";

    this.commandeService.commandArray[index] = { name: name, price: price, image: image, quantity: quantity, total: total };

  }

  //Function to clear the cart
  clearCart() {
    this.panier = [];
  }

  //Function to pass on the payment part
  validateCart() {
    
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
}
