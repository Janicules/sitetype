import { AdminPage } from './../pages/admin/admin';
import { PaiementPage } from './../pages/paiement/paiement';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ComptePage } from "../pages/compte/compte";
import { ContacteznousPage } from "../pages/contacteznous/contacteznous";
import { PanierPage } from "../pages/panier/panier";
import { GateauPage } from '../pages/gateau/gateau';
import { PlatPage } from '../pages/plat/plat';
import { MdpoubliePage } from '../pages/mdpoublie/mdpoublie';
import { CreationcomptePage } from '../pages/creationcompte/creationcompte';
import { AppServiceProvider } from '../providers/app-service/app-service';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { HttpModule } from '@angular/http';
import { EmailComposer } from '@ionic-native/email-composer';
import { CommandeProvider } from '../providers/commande/commande';
import { ToastProvider } from '../providers/toast/toast';
import { ConfirmerPage } from '../pages/confirmer/confirmer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RedirectionProvider } from '../providers/redirection/redirection';
import {NgxPaginationModule, PaginatePipe, PaginationControlsDirective} from 'ngx-pagination';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ComptePage,
    ContacteznousPage,
    PanierPage,
    GateauPage,
    PlatPage,
    MdpoubliePage,
    CreationcomptePage,
    ConfirmerPage,
    PaiementPage,
    AdminPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    NgxPaginationModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ComptePage,
    ContacteznousPage,
    PanierPage,
    GateauPage,
    PlatPage,
    MdpoubliePage,
    CreationcomptePage,
    ConfirmerPage,
    PaiementPage,
    AdminPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AppServiceProvider,
    ApiServiceProvider,
    EmailComposer,
    CommandeProvider,
    ToastProvider,
    InAppBrowser,
    RedirectionProvider
  ]
})
export class AppModule { }
