import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestProvider} from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import {BaseUI} from "../../common/baseui";
import {ParkingPlacesModel} from "../../common/models";

declare var AMap: any;
declare var parks: any;
declare var buildings: any;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage extends BaseUI {
  isMask: boolean = true;
  role: string = 'vistor';
  parks: ParkingPlacesModel[] = [];

  constructor(public navCtrl: NavController,
              public storage: Storage,
              public loadCtrl: LoadingController,
              public restProvider: RestProvider,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
    super();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MapPage');
    this.mapInit();
  }

  ionViewDidEnter() {
    this.getRole();
  }

  getRole() {
    this.role = this.navParams.get('role');
    if ('undefined' == typeof(this.role)) {
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
    let key = 'type=' + (this.role == 'vistor' ? 'v' : '') + '&parkingPlacesName=';
    this.restProvider.getParks(key).subscribe(
      data => {
        loading.dismiss();
        if (data.state || 'undefined' == typeof (data.state)) {
          this.parks = data;
          console.log(this.parks);
        }
        else {
          super.showToast(this.toastCtrl, data.msg, 2);
        }
      }
    );
  }
  mapInit(){
    //初始化加载地图
    let map = new AMap.Map('container', {
      mapStyle: 'amap://styles/4baab3de6130840ec99a93e129518818',//样式URL
      resizeEnable: true,
      dragEnable: true,
      keyboardEnable: true,
      doubleClickZoom: true,
      zoom: 16,
      zooms:[16,18],
      center: [113.401572,23.175374]
    });

    //限制可视区域
    setLimitBounds();
    function setLimitBounds() {
      map.setLimitBounds(map.getBounds());
    }

    //设置地图显示内容
    map.setFeatures(['road', 'point', 'building', 'bg']);

    //增加工具条
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.MapType'],
      function () {
        map.addControl(new AMap.ToolBar());//加载工具条(ToolBar){ locationMarker: customMarker }
        map.addControl(new AMap.Scale());//加载比例尺
        // map.addControl(new AMap.MapType());//加载地图实景（含路况）
      });


  }

}
