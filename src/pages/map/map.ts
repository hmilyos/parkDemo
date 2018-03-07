import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
export class MapPage {
  isMask: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.mapInit();
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
