import { AppServiceProvider } from './../../providers/app-service/app-service';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { CreationcomptePage } from '../creationcompte/creationcompte';
import { ComptePage } from '../compte/compte';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { HomePage } from '../home/home';
import { PanierPage } from '../panier/panier';

/**
 * Generated class for the MdpoubliePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mdpoublie',
  templateUrl: 'mdpoublie.html',
})
export class MdpoubliePage {

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variables for the connection :
  password: string = "";
  passwordConfirm: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private apiService: ApiServiceProvider, private appService: AppServiceProvider) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  //Display a popup when there is a problem :
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }

  //Function when the user click on modify button
  changePassword() {
    let possede_maj = false;
    let possede_min = false;
    let possede_nombre_password: boolean = false;

    if (/[A-Z]+/.test(this.password)) {
      possede_maj = true;
    } else {
      possede_maj = false;
    }

    if (/[a-z]+/.test(this.password)) {
      possede_min = true;
    } else {
      possede_min = false;
    }

    if (/[1-9]+/.test(this.password)) {
      possede_nombre_password = true;
    } else {
      possede_nombre_password = false;
    }

    if (this.password.length < 8) {
      this.presentToast("Votre mot de passe doit contenir 8 caractères");
      return;
    }
    if (possede_maj == false) {
      this.presentToast("Il faut au moins une majuscule dans le mot de passe");
      return;
    }
    if (possede_min == false) {
      this.presentToast("Il faut au moins une minuscule dans le mot de passe");
      return;
    }
    if (possede_nombre_password == false) {
      this.presentToast("Il faut au moins un nombre dans le mot de passe");
      return;
    }
    if (this.password != this.passwordConfirm) {
      this.presentToast("Vos deux mots de passe doivent correspondre");
      return;
    }
    if (this.appService.email || window.localStorage.getItem('email')){
      const email = this.appService.email ? this.appService.email : window.localStorage.getItem('email');

      let data: any;
      this.apiService.get("inscription.php", "?changePassword=true&email=" + email + "&password=" + this.password)
        .then(
          response => {
            data = response;
            if (data._body != "modified") {
              this.presentToast("Erreur - Merci de réessayer plus tard");
              return;
            }
            else {
                this.presentToast("Mot de passe modifié");
                this.navCtrl.push(HomePage);
            }
          }
        )
        .catch(err => console.log("error for API ", err));
      }
  }

  //Functions to redirect the user to other pages
  redirectionInscription() {
    this.navCtrl.setRoot(CreationcomptePage, { choix: this.choix });
  }
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
