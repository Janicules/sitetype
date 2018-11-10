import { AppServiceProvider } from './../../providers/app-service/app-service';
import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PanierPage } from '../panier/panier';
import { ComptePage } from '../compte/compte';
import { ContacteznousPage } from '../contacteznous/contacteznous';
import { PlatPage } from '../plat/plat';
import { GateauPage } from '../gateau/gateau';
import { HomePage } from '../home/home';

/**
 * Generated class for the CreationcomptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-creationcompte',
  templateUrl: 'creationcompte.html',
})
export class CreationcomptePage {

  //Variable to set the choice of the user (Livraison / A emporter / Sur place)
  choix: string;

  //Variables for the inscription 
  email: string = "";
  username: string = "";
  password: string = "";
  passwordConfirm: string = "";
  lastName: string = "";
  firstName: string = "";
  address: string = "";
  city: string = "";
  zipCode: string = "";
  phone: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController,
    private apiService: ApiServiceProvider, private appService: AppServiceProvider) {
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

  //When we click on inscription button 
  inscription() {

    let possede_maj;
    let possede_min;
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

    if (this.email.length < 6) {
      this.presentToast("Il faut au minimum 6 caractères dans l'adresse mail");
      return;
    }
    if (this.isEmailValid(this.email) == false) {
      this.presentToast("Adresse email invalide");
      return;
    }
    if (this.username.length < 1) {
      this.presentToast("Il faut au minimum 1 caractères dans le nom d'utilisateur");
      return;
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
    if (this.address.length < 6) {
      this.presentToast("Il faut au minimum 10 caractères dans l'adresse");
      return;
    }
    if (this.city.length < 2) {
      this.presentToast("Il faut au minimum 2 caractères dans la ville");
      return;
    }
    if (this.hasNumber(this.city) == true) {
      this.presentToast("La ville ne peut pas contenir de chiffre");
      return;
    }
    if (this.zipCode.length != 5) {
      this.presentToast("Il faut 5 chiffres dans le code postal");
      return;
    }
    if (isNaN(parseInt(this.zipCode))) {
      this.presentToast("Le code postal ne doit contenir que des chiffres");
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

    let data: any;
    this.apiService.get("inscription.php", "?email=" + this.email + "&username=" + this.username +
      "&password=" + this.password + "&lastName=" + this.lastName + "&firstName=" + this.firstName +
      "&address=" + this.address + "&city=" + this.city + "&zipCode=" + this.zipCode + "&phone=" + this.phone)
      .then(
        response => {
          data = response;
          if (data._body == "email") {
            this.presentToast("Cette adresse email est déjà utilisée");
            return;
          }
          else if (data._body == "username") {
            this.presentToast("Ce nom d'utilisateur est déjà utilisé");
            return;
          }
          else {
            if (data._body != "saved") {
              this.presentToast("Erreur - Merci de réessayer plus tard");
              return;
            } else {
              this.presentToast("Utilisateur enregistré");
              this.appService.email = this.email;
              this.appService.connected = true;

              this.navCtrl.push(HomePage);
            }
          }
        }
      )
      .catch(err => console.log("error for API ", err));
  }

  //Function to redirect the user to other pages
  redirectionPanier() {
    this.navCtrl.setRoot(PanierPage, { choix: this.choix });
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
}
