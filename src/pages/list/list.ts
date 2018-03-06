import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams, ToastController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";
import {ParkingPlacesModel} from "../../common/models";

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage extends BaseUI{
  searchUrl: string = '';
  parkingPlacesName: string = '';
  parks: ParkingPlacesModel[] = [];

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public modalCtrl: ModalController,
              public loadCtrl: LoadingController,
              public restProvider: RestProvider,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
  }

  doRefresh(refresher){
    this.getParks();
    refresher.complete();
  }


  ionViewDidEnter() {
   this.getParks();
  }

  toDetail(id){
    this.navCtrl.push('ParkFormPage', {pid: id});
  }

  getParks(){
    var loading = super.showLoading(this.loadCtrl, "加载中...");
    this.storage.get('role').then((role) => {
      this.searchUrl = 'type=' + (role == 'vistor' ? 'v' : '') + '&parkingPlacesName=' + this.parkingPlacesName.trim();
      this.restProvider.getParks(this.searchUrl).subscribe(
        data => {
          if (data.state || 'undefined' == typeof (data.state)) {
            this.parks = data;
          }
          else {
            super.showToast(this.toastCtrl, data.msg);
          }
          loading.dismiss();
        }
      );
    });
  }

}


