import { Component } from '@angular/core';
import {IonicPage, LoadingController, ModalController, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {BaseUI} from "../../common/baseui";
import {RestProvider} from "../../providers/rest/rest";

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

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public modalCtrl: ModalController,
              public loadCtrl: LoadingController,
              public restProvider: RestProvider,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
  }

  doRefresh(){

  }
  searchUrl: string = '';
  parkingPlacesName: string = '';
  parks: ParkingPlacesModel[] = [];

  ionViewDidEnter() {
    var loading = super.showLoading(this.loadCtrl, "加载中...");
    setTimeout(() => loading.dismiss(), 3000);
    this.storage.get('role').then((role) => {
      console.log(role);
      this.searchUrl = 'type=' + (role == 'vistor' ? 'v' : '') + '&parkingPlacesName=' + this.parkingPlacesName.trim();
      this.restProvider.getParks(this.searchUrl).subscribe(
        data => {
          console.log(data);
          this.parks = data;
        }
      );
    });
  }

}


export class ParkingPlacesModel {
  constructor(/**
               * 停车场ID
               */
              public  parkingPlacesId?: string,
              /**
               * 停车场编号
               */
              public  parkingPlacesName?: string,
              /**
               * 车位总数
               */
              public  parkingTotal?: number,
              /**
               * 剩余车位数
               */
              public  parkingRemaining?: number,
              /**
               * 停车类型
               */
              public  parkingType?: string,
              /**
               * 访客是否可见  （0：不可见  1：可见）
               */
              public  visitorsVisible?: number,
              /**
               * 员工是否可见  （0：不可见  1：可见）
               */
              public  employeeVisible?: number,
              /**
               * 停车场位置
               */
              public  parkingPlacesAddress?: string,
              /**
               * 停车属性
               */
              public  parkingProperty?: string,
              /**
               * 导航图
               */
              public   navigationMap?: string,
              /**
               * 停车场说明
               */
              public  remark?: string,
              /**
               * 状态
               */
              public  status?: number,
              /**
               * 创建人
               */
              public  createBy?: string,
              /**
               * 创建时间
               */
              public  createTime?: string,
              /**
               * 修改人
               */
              public  modifyBy?: string,
              /**
               * 修改时间
               */
              public  modifyTime?: string
  ) {
  }
}
