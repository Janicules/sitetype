import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {ComptePage} from "../pages/compte/compte";
import {ContacteznousPage} from "../pages/contacteznous/contacteznous";
import {PanierPage} from "../pages/panier/panier";
import {GateauPage} from '../pages/gateau/gateau';
import {PlatPage} from '../pages/plat/plat';
import { MdpoubliePage } from '../pages/mdpoublie/mdpoublie';
import { CreationcomptePage } from '../pages/creationcompte/creationcompte';
import { AppServiceProvider } from '../providers/app-service/app-service';

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
      CreationcomptePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
      CreationcomptePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppServiceProvider
  ]
})
export class AppModule {}
