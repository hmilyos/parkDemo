import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
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
  parkingPlacesName: string = '';
  parks: ParkingPlacesModel[] = [];
  role: string = 'vistor';
  currentId: string = '';
  selectPark: ParkingPlacesModel;
  carnumber: number = 0;

  constructor(public navCtrl: NavController,
              public storage: Storage,
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
   this.getRole();
  }

  toDetail(id){
    this.storage.set('pid', id);
    this.navCtrl.push('ParkFormPage', {pid: id});
  }

  getRole(){
    this.role = this.navParams.get('role');
    if('undefined' == typeof(this.role)){
      this.storage.get('role').then((role) => {
        this.role = role;
        this.getParks();
      });
    }
    else {
      this.getParks();
    }

  }

  getParks(){
    let loading = super.showLoading(this.loadCtrl, "加载中...");
    let key = 'type=' + (this.role == 'vistor' ? 'v' : '') + '&parkingPlacesName=' + this.parkingPlacesName.trim();
    this.restProvider.getParks(key).subscribe(
      data => {
        loading.dismiss();
        if (data.state || 'undefined' == typeof (data.state)) {
          this.parks = data;
        }
        else {
          super.showToast(this.toastCtrl, data.msg, 2);
        }
      }
    );
  }

  /*减一*/
  increase() {
    this.carnumber == null && (this.carnumber = 0);
    this.carnumber > 0 && this.carnumber--;
  }

  /*加一*/
  add() {
    this.carnumber == null && (this.carnumber = 0);
    this.selectPark.parkingTotal > this.carnumber && this.carnumber++;
  }

  /*执行车位修改*/
  update() {
    this.carnumber == null && (this.carnumber = 0);
    let loading = super.showLoading(this.loadCtrl, '更新中...');
    this.carnumber > this.selectPark.parkingTotal && (this.carnumber = this.selectPark.parkingTotal);
    this.carnumber < 0 && (this.carnumber = 0);
    let updateNum = this.carnumber - this.selectPark.parkingRemaining;
    if (updateNum != 0) {
      this.restProvider.updateNum(this.selectPark.parkingPlacesId, updateNum).subscribe(
        data => {
          loading.dismiss();
          if ('true' == data.msg) {
            super.showToast(this.toastCtrl, '更新成功', 2);
            this.getParks();
          }
          else {
            super.showToast(this.toastCtrl, data.msg, 1);
          }
        }
      );
    } else {
      loading.dismiss();
      super.showToast(this.toastCtrl, '更新成功', 2);
      this.getParks();
    }

  }

  numValidator(event) {
    '.' == event.key && (this.carnumber = this.selectPark.parkingRemaining);
    (this.carnumber % 1) != 0 && (this.carnumber = Math.round(this.carnumber));
    this.carnumber > this.selectPark.parkingTotal && (this.carnumber = this.selectPark.parkingTotal);
    this.carnumber < 0 && (this.carnumber = 0);
  }

  toShow(p: ParkingPlacesModel){
    if(this.currentId == p.parkingPlacesId){
      this.currentId = '';
    }else {
      this.currentId = p.parkingPlacesId;
    }
    this.selectPark = p;
    this.carnumber = this.selectPark.parkingRemaining;
  }

  cancel(){
    this.currentId = '';
  }

  toMap(){
    this.navCtrl.push('MapPage', {role: this.role});
  }
}


