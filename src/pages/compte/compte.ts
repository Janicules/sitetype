import { AppServiceProvider } from './../../providers/app-service/app-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { HomePage } from '../home/home';
import { CreationcomptePage } from '../creationcompte/creationcompte';
import { MdpoubliePage } from '../mdpoublie/mdpoublie';
import { PanierPage } from '../panier/panier';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

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

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variables for the connection :
  email: string = "";
  password: string = "";
  remember: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private apiService: ApiServiceProvider, private appService: AppServiceProvider) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  //Function to display a little text 
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
    });

    toast.present();
  }

  //Function when the user click on the connection button
  connexion() {
    if (this.email.length < 6) {
      this.presentToast("Merci de saisir un email valide");
      return;
    }
    if (this.password.length < 6) {
      this.presentToast("Merci de rentrer un mot de passe valide");
      return;
    }

    this.apiService.get("connexion.php", "?email=" + this.email + "&password=" + this.password)
      .then(result => {
        const data: any = result;

        if (data._body == "true") {
          this.presentToast("Vous êtes maintenant connecté");
          this.appService.email = this.email;
          this.appService.connected = true;


          if (this.remember)
            window.localStorage.setItem('email', this.email);
          else
            if(window.localStorage.getItem('email'))
              window.localStorage.removeItem('email');

          this.navCtrl.setRoot(HomePage);
        } else {
          this.presentToast("L'email ou le mot de passe est incorrect");
        }
      })
      .catch(error => {
        this.presentToast("Erreur réseau");
      })
  }

  //Functions to redirect the user to another pages
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
  redirectionInscription() {
    this.navCtrl.setRoot(CreationcomptePage, { choix: this.choix });
  }
  redirectionMdp() {
    this.navCtrl.setRoot(MdpoubliePage, { choix: this.choix });
  }
  redirectionPanier() {
    this.navCtrl.setRoot(PanierPage, { choix: this.choix });
  }
}
