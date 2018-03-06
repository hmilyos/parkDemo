import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {ParkingPlacesModel} from "../../common/models";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  ifTest: boolean = true;

  constructor(public http: HttpClient) {
  }

  /*保存停车场*/
  addPark(json: ParkingPlacesModel): Observable<any>{
    return  this.postUrlReturn('/vehicle/parkingmana/addParking', json);
  }

  /*修改停车场信息*/
  updatePark(json: ParkingPlacesModel): Observable<any>{
    return  this.postUrlReturn('/vehicle/parkingmana/updateParking', json);
  }

  /*修改数量*/
  updateNum(id: string, num: number): Observable<any>{
    let json = '{"parkingPlacesId":"' + id + '","num":"' + num + '"}';
    return  this.postUrlReturn('/vehicle/parkingmana/updateParkingTotal', JSON.parse(json));
  }

  /*根据ID查停车场*/
  getParkByPid(id: string): Observable<any>{
    return  this.getUrlReturn('/vehicle/parkingmana/queryParkingLot?parkingPlacesId=' + id);
  }

  /*查所有停车场*/
  getParks(key): Observable<any>{
    return  this.getUrlReturn('/vehicle/parkingmana/queryParkingTotal?' + key);
  }

  private getUrlReturn(url: string): Observable<Object> {
    url += ((url.indexOf('?') == -1 ? '?' : '&') + 'td=' + new Date().getTime());
    //let parkUrlHeard = this.getParkUrlHeard() + url;
    console.log(url);
    return this.http.get(encodeURI(this.getParkUrlHeard() + url)).catch(err => {
      return  Observable.throw(err ? err : {'msg': '出错啦！'} );
    });
  }

  private postUrlReturn(url: string, body: any): Observable<Object> {
    return this.http.post(this.getParkUrlHeard() + url, body).catch(err => {
      return  Observable.throw(err ? err : {'msg': '出错啦！'} );
    });
  }

  private getParkUrlHeard(): string{
    let parkUrlHeard = '';
    if(this.ifTest){
      parkUrlHeard = 'http://192.168.3.5:8084/restcloud/rest';
    }
    else {
      parkUrlHeard = 'No';
    }
    return parkUrlHeard;
  }

}
