import { ToastProvider } from './../../providers/toast/toast';
import { CommandeProvider } from './../../providers/commande/commande';
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

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variables for all cakes :
  gateaux: any = [
    {
      image: 'assets/imgs/gateau1.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau2.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau3.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau4.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau5.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau6.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau7.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau8.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau9.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau10.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau11.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau12.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau13.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau14.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau15.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau16.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau17.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau18.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau19.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau20.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau21.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
    {
      image: 'assets/imgs/gateau22.png',
      title: 'Gateau X',
      ingredients: 'Ingrédient Y',
      price: '2€50',
      euro: '2',
      centime: '50',
      titleTool: 'Plat',
      ingredientTool: 'Ingrédients',
    },
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams, private commandeService: CommandeProvider,
    private toastService: ToastProvider) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  //Function when we click on the select button 
  addCart(name, price, image) {
    this.toastService.presentToast("Le produit a été ajouté à votre panier");

    if (this.commandeService.commandArray) {
      var find = this.commandeService.commandArray.findIndex(function (element) {
        // return element.name == name;
        return element.image == image
      });

      if (find >= 0) {
        let name = this.commandeService.commandArray[find].name;
        let price = this.commandeService.commandArray[find].price;
        let image = this.commandeService.commandArray[find].image;
        let quantity = this.commandeService.commandArray[find].quantity + 1;

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

        this.commandeService.commandArray[find] = { name: name, price: price, image: image, quantity: quantity, total: total };
      }
      else
        this.commandeService.commandArray.push({ name: name, price: price, image: image, quantity: 1, total: price });
    }
    else
      this.commandeService.commandArray.push({ name: name, price: price, image: image, quantity: 1, total: price });
  }

  //Functions to redirect the user to other pages
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
