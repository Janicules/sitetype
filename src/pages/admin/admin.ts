import { ApiServiceProvider } from './../../providers/api-service/api-service';
import { PanierPage } from './../panier/panier';
import { HomePage } from './../home/home';
import { GateauPage } from './../gateau/gateau';
import { PlatPage } from './../plat/plat';
import { ContacteznousPage } from './../contacteznous/contacteznous';
import { ComptePage } from './../compte/compte';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SMS } from '@ionic-native/sms';

/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  choix: string;
  commands: any = [];
  totalCommands: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider,
    private alertCtrl: AlertController, private sms: SMS) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  ionViewWillEnter() {
    this.getCommands();
  }

  //Function to get commands :
  getCommands() {
    this.apiService.get("getCommands.php", "")
    .then(
      response => {
        let data;
        data = response;
        this.commands = data.json();
        this.totalCommands = this.commands.length;
      }
    )
    .catch(err => console.log("error when getting commands"));
  }

  //Function to get payments informations :
  getPayments() {
    
  }

  filter(category, event) {

  }

  sendSMS(phone) {
    const prompt = this.alertCtrl.create({
      title: 'Envoyer un SMS',
      message: "Saisissez le message à envoyer à l'utilisateur",
      inputs: [
        {
          name: 'message',
          placeholder: 'Saisissez votre message...'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            if (data.name) {
              this.sms.send(phone, data.name);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  //Redirect the user to other pages
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

  redirectionAdmin() {
    this.navCtrl.setRoot(AdminPage, {choix: this.choix});
  }
}
