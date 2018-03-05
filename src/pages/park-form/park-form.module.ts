import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParkFormPage } from './park-form';

@NgModule({
  declarations: [
    ParkFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ParkFormPage),
  ],
})
export class ParkFormPageModule {}
