import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

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

  /*查所有停车场*/
  getParks(key): Observable<any>{
    return  this.getUrlReturn('/vehicle/parkingmana/queryParkingTotal?' + key);
  }

  private getUrlReturn(url: string): Observable<Object> {
    url += ((url.indexOf('?') == -1 ? '?' : '&') + 'td=' + new Date().getTime());
    //let parkUrlHeard = this.getParkUrlHeard() + url;
    console.log(url);
    return this.http.get(encodeURI(this.getParkUrlHeard() + url)).catch(err => {
      return  Observable.throw(err ? err : {'errMsg': '出错啦！'} );
    });
  }

  private postUrlReturn(url: string, body: any): Observable<Object> {
    return this.http.post(this.getParkUrlHeard() + url, body).catch(err => {
      return  Observable.throw(err ? err : {'errMsg': '出错啦！'} );
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
