import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';


export interface Region {
  name: string;
  url: string;
}
export interface RegionPrice {
  //国家
  regionName: string;
  //所有价格
  listPrice: priceInfo[];
}
export interface priceInfo {
  //价格名称:  个人普通会员
  name: string;
  // 1個月 (30天)
  range: string;
  currency: string;
  price: string;
}
export interface UidInfo {
  uid: number;
  name: string;
  range: string;
}

@Injectable()
export class Service {
  constructor(private httpClient: HttpClient) { }

  getNsOnlinePrice(): Observable<RegionPrice[]> {
    const httpOptions = {
      headers: new HttpHeaders()
    }
    var apiUrl=null ;
    if(apiUrl==null){
      apiUrl="https://nsonlineprice.wangshuai.app/api";
    }

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');
    return this.httpClient.get<RegionPrice[]>(apiUrl, httpOptions).pipe(
      // tap(_ => this.log(`add hero w/ id =${_.id}`),
      //   catchError(this.handleError<RegionPrice>('addHero'))
      // )
    );

  }
}


