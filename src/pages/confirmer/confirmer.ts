import { CommandeProvider } from './../../providers/commande/commande';
import { PaiementPage } from './../paiement/paiement';
import { ToastProvider } from './../../providers/toast/toast';
import { AppServiceProvider } from './../../providers/app-service/app-service';
import { HomePage } from './../home/home';
import { GateauPage } from './../gateau/gateau';
import { ComptePage } from './../compte/compte';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { CreationcomptePage } from '../creationcompte/creationcompte';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { PlatPage } from '../plat/plat';
import { PanierPage } from '../panier/panier';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the ConfirmerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirmer',
  templateUrl: 'confirmer.html',
})
export class ConfirmerPage {

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variable to get the cart 
  panier: any = [];
  total: number;


  //Variables for inputs 
  address: string = "";
  city: string = "";
  zipCode: number;
  payment: string = "";
  textValidate: string = "Commander";

  mail: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appService: AppServiceProvider,
    private toastService: ToastProvider, private apiService: ApiServiceProvider, private commandeService: CommandeProvider,
    private inAB: InAppBrowser, private platform: Platform) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
    this.panier = this.navParams.get('panier');
    this.total = this.navParams.get('total');

    if (this.appService.email)
      this.mail = this.appService.email;
    else if (window.localStorage.getItem('email'))
      this.mail = window.localStorage.getItem('email');
  }

  //Check if the string contains number :
  hasNumber(myString) {
    return /\d/.test(myString);
  }

  //Function when the payment method changes
  getPayment() {
    if (this.payment == "paypal")
      this.textValidate = "Payer avec PayPal";
    else if (this.payment == "card")
      this.textValidate = "Payer";
    else
      this.textValidate = "Commander";
  }

  //Function to pay 
  payer() {
    if (this.appService.email || window.localStorage.getItem('email')) {
      if (this.address.length < 6) {
        this.toastService.presentToast("Il faut au minimum 10 caractères dans l'adresse");
        return;
      }
      if (this.city.length < 2) {
        this.toastService.presentToast("Il faut au minimum 2 caractères dans la ville");
        return;
      }
      if (this.hasNumber(this.city) == true) {
        this.toastService.presentToast("La ville ne peut pas contenir de chiffre");
        return;
      }
      if (this.zipCode.toString().length != 5) {
        this.toastService.presentToast("Il faut 5 chiffres dans le code postal");
        return;
      }
      if (isNaN(this.zipCode)) {
        this.toastService.presentToast("Le code postal ne doit contenir que des chiffres");
        return;
      }
      if (this.payment.length < 1) {
        this.toastService.presentToast("Veuillez choisir un moyen de paiement");
        return;
      }

      if (this.payment == "paypal") {
        let data: any;

        this.panier.forEach(card => {
          let price;
          let tmpprice = card.price.split("€");
          if (tmpprice.length == 2)
            price = tmpprice[0] + "." + tmpprice[1];
          else
            price = tmpprice[0];

          card.price = price;
        });

        this.panier = JSON.stringify(this.panier);

        let total;
        let tmpTotal = this.total.toString().split("€");
        if (tmpTotal.length == 2)
          total = tmpTotal[0] + "." + tmpTotal[1];
        else
          total = tmpTotal[0];

        this.apiService.get("payment.php", '?price=' + total + "&card=" + this.panier + "&custom=" + 
        this.mail + ",;." + this.address + ",;." + this.city + ",;." + this.zipCode + ",;." + this.choix)
          .then(
            response => {
              data = response;
              data = data.json();
              if (!data['link']) {
                this.toastService.presentToast("Une erreur s'est produite lors de la connexion avec Paypal");
                return;
              }
              else {
                if (this.platform.is('core') || this.platform.is('mobileweb'))
                  window.location.href = data.link;
                else {
                  const browser = this.inAB.create(data.link, "_blank");
                  browser.on('loadstart').subscribe(event => {
                    if ((event.url).indexOf("http://localhost:8012/index.html") === 0) {
                      browser.close();

                      // console.log("eventUrl", event.url);

                      let responseParameters = ((event.url).split("?")[1]).split("&");
                      let parsedResponse = {};
                      for (let i = 0; i < responseParameters.length; i++) {
                        parsedResponse[responseParameters[i].split("=")[0]] = responseParameters[i].split("=")[1];
                      }
                    }
                  });
                }
              }
            }
          )
          .catch(err => console.log("error connexion PayPal"));
      }
      else if (this.payment == "card") {
        this.navCtrl.setRoot(PaiementPage, { choix: this.choix, total: this.total, panier: this.panier });
      }
      else {
        this.panier = JSON.stringify(this.panier);

        let data: any;
        this.apiService.get("insertCommand.php", "?user=" + this.mail + "&choice=" + this.choix +
          "&total=" + this.total + "&card=" + this.panier + "&method=" + this.payment +
          "&address=" + this.address + "&city=" + this.city + "&zipCode=" + this.zipCode)
          .then(
            response => {
              data = response;
              if (data._body == "missing") {
                this.toastService.presentToast("Une erreur s'est produite, il manque des paramètres à la requête");
                return;
              }
              else {
                if (data._body != "saved") {
                  this.toastService.presentToast("Erreur - Merci de réessayer plus tard");
                  return;
                } else {
                  this.toastService.presentToast("Commande envoyée");
                  this.commandeService.commandArray = [];
                  this.navCtrl.setRoot(HomePage);
                }
              }
            }
          )
          .catch(err => console.log("error for API ", err));
      }
    }
    else
      this.toastService.presentToast("Vous devez être connecté pour passer une commande");
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
