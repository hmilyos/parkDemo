import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ParkFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-park-form',
  templateUrl: 'park-form.html',
})
export class ParkFormPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkFormPage');
    console.log(this.navParams.get('pid'));
  }

  ionViewDidEnter() {
    console.log('---ionViewDidEnter--');
    console.log(this.navParams.get('pid'));
  }

}
