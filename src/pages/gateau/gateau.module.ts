import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GateauPage } from './gateau';

@NgModule({
  declarations: [
    GateauPage,
  ],
  imports: [
    IonicPageModule.forChild(GateauPage),
  ],
})
export class GateauPageModule {}
