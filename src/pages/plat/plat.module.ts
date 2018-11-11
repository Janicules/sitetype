import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlatPage } from './plat';

@NgModule({
  declarations: [
    PlatPage,
  ],
  imports: [
    IonicPageModule.forChild(PlatPage),
  ],
})
export class PlatPageModule {}
