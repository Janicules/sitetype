import { ToastProvider } from './../../providers/toast/toast';
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
  totalCommands: number = 0;

  payments: any = [];
  totalPayments: number = 0;
  category: string = 'none';
  inputPayment: string = "";

  categoryStats: string = 'mensuel';
  today = new Date();
  date: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiServiceProvider,
    private toastService: ToastProvider, private alertCtrl: AlertController, private sms: SMS) {
    this.choix = this.navParams.get('choix') ? this.navParams.get('choix') : "livraison";
  }

  ionViewWillEnter() {
    this.getCommands();
    this.getPayments();

    let dd: any = this.today.getDate();
    let mm: any = this.today.getMonth() + 1; //January is 0!
    const yyyy = this.today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    this.date = yyyy + '-' + mm + '-' + dd;
  }

  //Function to get commands :
  getCommands(user?: string) {
    if (!user)
      user = "";

    this.apiService.get("getCommands.php", "?user=" + user)
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
  getPayments(category?: string, value?: string) {
    if (!category && !value) {
      category = "";
      value = "";
    }

    this.apiService.get("getPayments.php", "?category=" + category + "&value=" + value)
      .then(
        response => {
          let data;
          data = response;
          this.payments = data.json();
          this.totalPayments = this.payments.length;
        }
      )
      .catch(err => console.log("error when getting payments"));
  }

  //Function to filter tables :
  filter(category, event) {
    if (category == 'user')
      this.getCommands(event.target.value);
    else if (category == 'payment') {
      if (typeof event == 'string') {
        if (this.category != "none" && event == "") {
          this.toastService.presentToast("Veuillez saisir une valeur à filtrer");
          return;
        }

        else if (event == "") {
          this.getPayments('', '');
          return;
        }
      }
      else if (typeof event == "object") {
        if (this.category == "none" && event && event.target && event.target.value) {
          this.toastService.presentToast("Veuillez saisir une catégorie à filtrer");
          return;
        }
        else if (event && event.target && event.target.value == '') {
          this.getPayments('', '');
          return;
        }
      }

      if (typeof event == "object")
        this.getPayments(this.category, event.target.value);
      else if (typeof event == "string")
        this.getPayments(this.category, event);

    }
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

  redirectionAdmin() {
    this.navCtrl.setRoot(AdminPage, { choix: this.choix });
  }
}
