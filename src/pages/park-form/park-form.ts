import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ParkingPlacesModel} from "../../common/models";
import {BaseUI} from "../../common/baseui";
import { Storage } from '@ionic/storage';
import {RestProvider} from "../../providers/rest/rest";
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
export class ParkFormPage extends BaseUI{

  employeeVisible: boolean = true;
  visitorsVisible: boolean = false;
  parkingTotal: any;
  parkingPlacesId: any = 0;
  model: ParkingPlacesModel = new ParkingPlacesModel('', '', 0, 0, '');

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public viewCtrl: ViewController,
              public restProvider: RestProvider,
              public loadCtrl: LoadingController,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    //console.log(this.navParams.get('pid'));
  }

  ionViewDidEnter() {
    //console.log(this.navParams.get('pid'));
    this.getId();
  }

  getId(){
    this.parkingPlacesId = this.navParams.get('pid');
    if('undefined' == typeof(this.parkingPlacesId)){
      this.storage.get('pid').then(
        id => {
          console.log('无：' + id);
          this.parkingPlacesId = id;
          this.getDetail();
        });
    }
    else {
      console.log('有: ' +  (this.parkingPlacesId));
      this.getDetail();
    }
  }

  getDetail(){
    if (this.parkingPlacesId != 0) {
      var loading = super.showLoading(this.loadCtrl, '加载中...');
      this.restProvider.getParkByPid(this.parkingPlacesId).subscribe(
        data => {
          loading.dismiss();
          this.model = new ParkingPlacesModel('', '', 0, 0, '');
          if (data.state || 'undefined' == typeof (data.state)) {
            this.model = data;
            this.parkingTotal = this.model.parkingTotal;
            this.employeeVisible = (this.model.employeeVisible == 1);
            this.visitorsVisible = (this.model.visitorsVisible == 1);
          }
          else {
            super.showToast(this.toastCtrl, data.msg, 2);
          }
        });
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  save(){
   if('undefined' == typeof (this.parkingTotal) || this.parkingTotal == null || this.parkingTotal.trim() == ''){
      super.showToast(this.toastCtrl, '停车位总数是必填项', 1);
    }
    else if (isNaN(this.parkingTotal)){
      super.showToast(this.toastCtrl, '停车位总数只能填数字', 1);
    }
    else if (parseInt(this.parkingTotal + '') < 0){
      super.showToast(this.toastCtrl, '停车位总数不能小于零', 1);
    }
    else {
      let fb = new FormBuilder();
      let formModel: FormGroup;
      formModel = fb.group({
        /*停车场ID*/
        parkingPlacesId: [this.model.parkingPlacesId],
        /*停车场名称*/
        parkingPlacesName: [this.model.parkingPlacesName],
        /*车位数*/
        parkingTotal: [parseInt(this.parkingTotal + '')],
        /**
         * 停车类型
         */
        parkingType: [this.model.parkingType],
        /**
         * 停车场位置
         */
        parkingPlacesAddress: [this.model.parkingPlacesAddress],
        /**
         * 导航图
         */
        navigationMap: [this.model.navigationMap],
        /**
         * 状态
         */
        status: [this.model.status],
        /**
         * 停车属性_访客
         */
        visitorsVisible: [this.visitorsVisible ? 1 : 0],
        /**
         * 停车属性_员工
         */
        employeeVisible: [this.employeeVisible ? 1 : 0]
      });
      console.log(formModel.value);
     var loading = super.showLoading(this.loadCtrl, '保存中...');
     if (this.parkingPlacesId == 0) {
       this.restProvider.addPark(formModel.value).subscribe(
         data => {
           loading.dismiss();
           if ('true' == data.msg) {
             super.showToast(this.toastCtrl, '保存成功', 2);
             setTimeout(() => {
               this.dismiss();
             }, 3);

           } else {
             //失败
             super.showToast(this.toastCtrl, data.msg, 2);
           }
         });
     }
     else {
       this.restProvider.updatePark(formModel.value).subscribe(
         data => {
           loading.dismiss();
           if ('true' == data.msg) {
             super.showToast(this.toastCtrl, '保存成功', 2);
             setTimeout(() => {
               this.dismiss();
             }, 3);

           } else {
             //失败
             super.showToast(this.toastCtrl, data.msg, 2);
           }
         });
     }
    }

  }

}
