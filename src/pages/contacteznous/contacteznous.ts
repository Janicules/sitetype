import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { ComptePage } from '../compte/compte';
import { HomePage } from '../home/home';
import { PanierPage } from '../panier/panier';
import { EmailComposer } from '@ionic-native/email-composer';

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

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variables to contact :
  lastName: string = "";
  firstName: string = "";
  email: string = "";
  phone: string = "";
  subject: string = "";
  message: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private emailComposer: EmailComposer) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  //Check if the user entered a good email
  isEmailValid(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  //Check if the string contains number :
  hasNumber(myString) {
    return /\d/.test(myString);
  }

  //Display a popup when there is a problem :
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }

  //Function to send a mail : 
  sendMessage() {
    if (this.lastName.length < 2) {
      this.presentToast("Il faut au minimum 2 caractères dans le nom");
      return;
    }
    if (this.hasNumber(this.lastName) == true) {
      this.presentToast("Votre nom ne peut pas contenir de chiffre");
      return;
    }
    if (this.firstName.length < 2) {
      this.presentToast("Il faut au minimum 2 caractères dans le prénom");
      return;
    }
    if (this.hasNumber(this.firstName) == true) {
      this.presentToast("Votre prénom ne peut pas contenir de chiffre");
      return;
    }
    if (this.email.length < 6) {
      this.presentToast("Il faut au minimum 6 caractères dans l'adresse mail");
      return;
    }
    if (this.isEmailValid(this.email) == false) {
      this.presentToast("Adresse email invalide");
      return;
    }
    if (this.phone.length != 10) {
      this.presentToast("Il faut 10 chiffres pour le numéro de téléphone");
      return;
    }
    if (isNaN(parseInt(this.phone))) {
      this.presentToast("Le téléphone ne doit contenir que des chiffres");
      return;
    }
    if (this.subject.length < 2) {
      this.presentToast("Veuillez sélectionner un motif pour votre message");
      return;
    }
    if (this.message.length < 5) {
      this.presentToast("Veuillez saisir un message");
      return;
    }

    let email = {
      to: 'mathias.arredondo@viacesi.fr',
      cc: [],
      bcc: [],
      attachments: [],
      subject: this.subject,
      body: this.message + "message reçu par " + this.firstName + " " + this.lastName + " --> " + this.email,
      isHtml: false
    }
    this.emailComposer.open(email);
  }

  //Function to redirect the user to other pages :
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
