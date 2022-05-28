import { cnyCurrencyInfo } from './cnyCurrencyInfo';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { observable, Observable, of, Subject } from 'rxjs';


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
  uid:number;
  //价格名称:  个人普通会员
  name: string;
  // 1個月 (30天)
  range: string;
  currency: string;
  price: string;
  /**
   * 人民币价格
   */
  cnyPrice:string;
  regionName: string;
  formatted_value:string;
    /**
   * 分组Id
   */
  groupId: string;
}
export interface UidInfo {
    /**
   * 分组Id
   */
     groupId: string;
  uid: number;
  name: string;
  range: string;
}


var dataTemp:RegionPrice[] = <RegionPrice[]>[
  {
      "regionName": "中国香港特别行政区",
      "listPrice": [
          {
              "uid": 70080000000585,
              "name": "Nintendo Switch Online 個人計劃",
              "groupId": "7fb703910f7e823d",
              "range": "1月",
              "currency": "HKD",
              "formatted_value": "HKD 25",
              "price": "25",
              "cnyPrice": "21.33555450679452"
          },
          {
              "uid": 70080000000586,
              "name": "Nintendo Switch Online 個人計劃",
              "groupId": "7fb703910f7e823d",
              "range": "3月",
              "currency": "HKD",
              "formatted_value": "HKD 65",
              "price": "65",
              "cnyPrice": "55.47244171766575"
          },
          {
              "uid": 70080000000587,
              "name": "Nintendo Switch Online 個人計劃",
              "groupId": "7fb703910f7e823d",
              "range": "1年",
              "currency": "HKD",
              "formatted_value": "HKD 155",
              "price": "155",
              "cnyPrice": "132.280437942126"
          },
          {
              "uid": 70080000000982,
              "name": "Nintendo Switch Online + 擴充包 家庭計劃",
              "groupId": "71de90a1cf1ae628",
              "range": "1年",
              "currency": "HKD",
              "formatted_value": "HKD 575",
              "price": "575",
              "cnyPrice": "490.71775365627394"
          },
          {
              "uid": 70080000000589,
              "name": "Nintendo Switch Online 家庭計劃",
              "groupId": "c3df9efd3d821bc7",
              "range": "1年",
              "currency": "HKD",
              "formatted_value": "HKD 295",
              "price": "295",
              "cnyPrice": "251.75954318017534"
          },
          {
              "uid": 70080000000981,
              "name": "Nintendo Switch Online + 擴充包 個人計劃",
              "groupId": "d97067bbfb3cf1d0",
              "range": "1年",
              "currency": "HKD",
              "formatted_value": "HKD 325",
              "price": "325",
              "cnyPrice": "277.36220858832877"
          }
      ]
  },
  {
      "regionName": "美国",
      "listPrice": [
          {
              "uid": 70080000000184,
              "name": "Nintendo Switch Online individual membership ",
              "groupId": "7fb703910f7e823d",
              "range": "1月",
              "currency": "USD",
              "formatted_value": "$3.99",
              "price": "3.99",
              "cnyPrice": "20.095789932009243"
          },
          {
              "uid": 70080000000185,
              "name": "Nintendo Switch Online individual membership ",
              "groupId": "7fb703910f7e823d",
              "range": "3月",
              "currency": "USD",
              "formatted_value": "$7.99",
              "price": "7.99",
              "cnyPrice": "46.89017650802157"
          },
          {
              "uid": 70080000000186,
              "name": "Nintendo Switch Online individual membership ",
              "groupId": "7fb703910f7e823d",
              "range": "1年",
              "currency": "USD",
              "formatted_value": "$19.99",
              "price": "19.99",
              "cnyPrice": "127.27333623605854"
          },
          {
              "uid": 70080000000943,
              "name": "Nintendo Switch Online + Expansion Pack family membership",
              "groupId": "71de90a1cf1ae628",
              "range": "1年",
              "currency": "USD",
              "formatted_value": "$79.99",
              "price": "79.99",
              "cnyPrice": "529.1891348762434"
          },
          {
              "uid": 70080000000194,
              "name": "Nintendo Switch Online family membership ",
              "groupId": "c3df9efd3d821bc7",
              "range": "1年",
              "currency": "USD",
              "formatted_value": "$34.99",
              "price": "34.99",
              "cnyPrice": "227.75228589610475"
          },
          {
              "uid": 70080000000945,
              "name": "Nintendo Switch Online + Expansion Pack individual membership",
              "groupId": "d97067bbfb3cf1d0",
              "range": "1年",
              "currency": "USD",
              "formatted_value": "$49.99",
              "price": "49.99",
              "cnyPrice": "328.231235556151"
          }
      ]
  },
  {
      "regionName": "日本",
      "listPrice": [
          {
              "uid": 70080000000182,
              "name": "Nintendo Switch Online 個人プラン",
              "groupId": "7fb703910f7e823d",
              "range": "1月",
              "currency": "JPY",
              "formatted_value": "306円",
              "price": "306",
              "cnyPrice": "16.12787443785661"
          },
          {
              "uid": 70080000000181,
              "name": "Nintendo Switch Online 個人プラン",
              "groupId": "7fb703910f7e823d",
              "range": "3月",
              "currency": "JPY",
              "formatted_value": "815円",
              "price": "815",
              "cnyPrice": "42.95495969559849"
          },
          {
              "uid": 70080000000183,
              "name": "Nintendo Switch Online 個人プラン",
              "groupId": "7fb703910f7e823d",
              "range": "1年",
              "currency": "JPY",
              "formatted_value": "2,400円",
              "price": "2400",
              "cnyPrice": "126.4931328459342"
          },
          {
              "uid": 70080000000941,
              "name": "Nintendo Switch Online + 追加パック ファミリープラン",
              "groupId": "71de90a1cf1ae628",
              "range": "1年",
              "currency": "JPY",
              "formatted_value": "8,900円",
              "price": "8900",
              "cnyPrice": "469.0787009703393"
          },
          {
              "uid": 70080000000193,
              "name": "Nintendo Switch Online ファミリープラン",
              "groupId": "c3df9efd3d821bc7",
              "range": "1年",
              "currency": "JPY",
              "formatted_value": "4,500円",
              "price": "4500",
              "cnyPrice": "237.1746240861266"
          },
          {
              "uid": 70080000000921,
              "name": "Nintendo Switch Online + 追加パック 個人プラン",
              "groupId": "d97067bbfb3cf1d0",
              "range": "1年",
              "currency": "JPY",
              "formatted_value": "4,900円",
              "price": "4900",
              "cnyPrice": "258.2568128937823"
          }
      ]
  },
  {
      "regionName": "俄罗斯",
      "listPrice": [
          {
              "uid": 70080000000187,
              "name": "Nintendo Switch Online Individual Membership",
              "groupId": "7fb703910f7e823d",
              "range": "1月",
              "currency": "RUB",
              "formatted_value": "279 RUB",
              "price": "279",
              "cnyPrice": "28.42445101840529"
          },
          {
              "uid": 70080000000188,
              "name": "Nintendo Switch Online Individual Membership",
              "groupId": "7fb703910f7e823d",
              "range": "3月",
              "currency": "RUB",
              "formatted_value": "559 RUB",
              "price": "559",
              "cnyPrice": "56.95078178956472"
          },
          {
              "uid": 70080000000189,
              "name": "Nintendo Switch Online Individual Membership",
              "groupId": "7fb703910f7e823d",
              "range": "1年",
              "currency": "RUB",
              "formatted_value": "1399 RUB",
              "price": "1399",
              "cnyPrice": "142.52977410304302"
          },
          {
              "uid": 70080000000964,
              "name": "Nintendo Switch Online + Expansion Pack Family Membership",
              "groupId": "71de90a1cf1ae628",
              "range": "1年",
              "currency": "RUB",
              "formatted_value": "6299 RUB",
              "price": "6299",
              "cnyPrice": "641.7405625983331"
          },
          {
              "uid": 70080000000195,
              "name": "Nintendo Switch Online Family Membership",
              "groupId": "c3df9efd3d821bc7",
              "range": "1年",
              "currency": "RUB",
              "formatted_value": "2449 RUB",
              "price": "2449",
              "cnyPrice": "249.50351449489088"
          },
          {
              "uid": 70080000000961,
              "name": "Nintendo Switch Online + Expansion Pack Individual Membership",
              "groupId": "d97067bbfb3cf1d0",
              "range": "1年",
              "currency": "RUB",
              "formatted_value": "3999 RUB",
              "price": "3999",
              "cnyPrice": "407.41713126380915"
          }
      ]
  },
  {
      "regionName": "韩国",
      "listPrice": [
          {
              "uid": 70080000000585,
              "name": "Nintendo Switch Online 個人計劃",
              "groupId": "7fb703910f7e823d",
              "range": "1月",
              "currency": "KRW",
              "formatted_value": "4,900원",
              "price": "4900",
              "cnyPrice": "26.083862748800925"
          },
          {
              "uid": 70080000000587,
              "name": "Nintendo Switch Online 個人計劃",
              "groupId": "7fb703910f7e823d",
              "range": "1年",
              "currency": "KRW",
              "formatted_value": "19,900원",
              "price": "19900",
              "cnyPrice": "105.93242218390579"
          },
          {
              "uid": 70080000000982,
              "name": "Nintendo Switch Online + 擴充包 家庭計劃",
              "groupId": "71de90a1cf1ae628",
              "range": "1年",
              "currency": "KRW",
              "formatted_value": "74,900원",
              "price": "74900",
              "cnyPrice": "398.71047344595695"
          },
          {
              "uid": 70080000000589,
              "name": "Nintendo Switch Online 家庭計劃",
              "groupId": "c3df9efd3d821bc7",
              "range": "1年",
              "currency": "KRW",
              "formatted_value": "37,900원",
              "price": "37900",
              "cnyPrice": "201.75069350603164"
          },
          {
              "uid": 70080000000981,
              "name": "Nintendo Switch Online + 擴充包 個人計劃",
              "groupId": "d97067bbfb3cf1d0",
              "range": "1年",
              "currency": "KRW",
              "formatted_value": "39,900원",
              "price": "39900",
              "cnyPrice": "212.39716809737894"
          }
      ]
  },
  {
      "regionName": "澳大利亚",
      "listPrice": [
          {
              "uid": 70080000000187,
              "name": "Nintendo Switch Online Individual Membership",
              "groupId": "7fb703910f7e823d",
              "range": "1月",
              "currency": "AUD",
              "formatted_value": "$5.95",
              "price": "5.95",
              "cnyPrice": "23.984381370851303"
          },
          {
              "uid": 70080000000188,
              "name": "Nintendo Switch Online Individual Membership",
              "groupId": "7fb703910f7e823d",
              "range": "3月",
              "currency": "AUD",
              "formatted_value": "$11.95",
              "price": "11.95",
              "cnyPrice": "52.765639015872864"
          },
          {
              "uid": 70080000000189,
              "name": "Nintendo Switch Online Individual Membership",
              "groupId": "7fb703910f7e823d",
              "range": "1年",
              "currency": "AUD",
              "formatted_value": "$29.95",
              "price": "29.95",
              "cnyPrice": "139.10941195093756"
          },
          {
              "uid": 70080000000964,
              "name": "Nintendo Switch Online + Expansion Pack Family Membership",
              "groupId": "71de90a1cf1ae628",
              "range": "1年",
              "currency": "AUD",
              "formatted_value": "$109.95",
              "price": "109.95",
              "cnyPrice": "522.8595138845584"
          },
          {
              "uid": 70080000000195,
              "name": "Nintendo Switch Online Family Membership",
              "groupId": "c3df9efd3d821bc7",
              "range": "1年",
              "currency": "AUD",
              "formatted_value": "$54.95",
              "price": "54.95",
              "cnyPrice": "259.0313188051941"
          },
          {
              "uid": 70080000000961,
              "name": "Nintendo Switch Online + Expansion Pack Individual Membership",
              "groupId": "d97067bbfb3cf1d0",
              "range": "1年",
              "currency": "AUD",
              "formatted_value": "$59.95",
              "price": "59.95",
              "cnyPrice": "283.01570017604536"
          }
      ]
  },
  {
      "regionName": "巴西",
      "listPrice": [
          {
              "uid": 70080000000184,
              "name": "Nintendo Switch Online individual membership ",
              "groupId": "7fb703910f7e823d",
              "range": "1月",
              "currency": "BRL",
              "formatted_value": "R$ 20,00",
              "price": "20",
              "cnyPrice": "28.31766186729494"
          },
          {
              "uid": 70080000000185,
              "name": "Nintendo Switch Online individual membership ",
              "groupId": "7fb703910f7e823d",
              "range": "3月",
              "currency": "BRL",
              "formatted_value": "R$ 40,00",
              "price": "40",
              "cnyPrice": "56.63532373458988"
          },
          {
              "uid": 70080000000186,
              "name": "Nintendo Switch Online individual membership ",
              "groupId": "7fb703910f7e823d",
              "range": "1年",
              "currency": "BRL",
              "formatted_value": "R$ 100,00",
              "price": "100",
              "cnyPrice": "141.5883093364747"
          },
          {
              "uid": 70080000000943,
              "name": "Nintendo Switch Online + Expansion Pack family membership",
              "groupId": "71de90a1cf1ae628",
              "range": "1年",
              "currency": "BRL",
              "formatted_value": "R$ 421,99",
              "price": "421.99",
              "cnyPrice": "596.0867823065585"
          },
          {
              "uid": 70080000000194,
              "name": "Nintendo Switch Online family membership ",
              "groupId": "c3df9efd3d821bc7",
              "range": "1年",
              "currency": "BRL",
              "formatted_value": "R$ 175,00",
              "price": "175",
              "cnyPrice": "247.7795413388307"
          },
          {
              "uid": 70080000000945,
              "name": "Nintendo Switch Online + Expansion Pack individual membership",
              "groupId": "d97067bbfb3cf1d0",
              "range": "1年",
              "currency": "BRL",
              "formatted_value": "R$ 262,99",
              "price": "262.99",
              "cnyPrice": "370.9613704615637"
          }
      ]
  }
];
var cnyPriceRate:cnyCurrencyInfo;

@Injectable()
export class Service {
  constructor(private httpClient: HttpClient) {
    var  options = {
      method: 'get',
      url: 'https://api.apilayer.com/fixer/latest?base=CNY',
      headers: {
        'apikey': 'C55BH16h4OgiZT6kOldVlkoYoptf4LM1'
      }
    };
    // httpClient.get<cnyCurrencyInfo>(options.url,{headers:options.headers}).subscribe(c=>{
    //   console.log('get cny price:',c);
    //   cnyPriceRate=c;
    // });
    cnyPriceRate={
      "success": true,
      "timestamp": 1653726543,
      "base": "CNY",
      "date": new Date("2022-05-28"),
      "rates": {
          "AED": 0.548339,
          "AFN": 13.286405,
          "ALL": 16.861782,
          "AMD": 66.906537,
          "ANG": 0.268869,
          "AOA": 62.589413,
          "ARS": 17.836948,
          "AUD": 0.208469,
          "AWG": 0.268787,
          "AZN": 0.254377,
          "BAM": 0.272733,
          "BBD": 0.301219,
          "BDT": 13.109523,
          "BGN": 0.272734,
          "BHD": 0.056249,
          "BIF": 300.958223,
          "BMD": 0.149285,
          "BND": 0.204382,
          "BOB": 1.025626,
          "BRL": 0.706273,
          "BSD": 0.149187,
          "BTC": 5.181338e-06,
          "BTN": 11.577341,
          "BWP": 1.795211,
          "BYN": 0.503303,
          "BYR": 2925.982724,
          "BZD": 0.300713,
          "CAD": 0.189925,
          "CDF": 299.316144,
          "CHF": 0.142997,
          "CLF": 0.004472,
          "CLP": 123.384498,
          "CNY": 1,
          "COP": 585.569757,
          "CRC": 100.770748,
          "CUC": 0.149285,
          "CUP": 3.956048,
          "CVE": 15.428646,
          "CZK": 3.434313,
          "DJF": 26.530959,
          "DKK": 1.03438,
          "DOP": 8.249539,
          "DZD": 21.715874,
          "EGP": 2.77572,
          "ERN": 2.239273,
          "ETB": 7.695692,
          "EUR": 0.13906,
          "FJD": 0.320232,
          "FKP": 0.122164,
          "GBP": 0.118207,
          "GEL": 0.431492,
          "GGP": 0.122164,
          "GHS": 1.157016,
          "GIP": 0.122164,
          "GMD": 8.080048,
          "GNF": 1318.185127,
          "GTQ": 1.144973,
          "GYD": 31.21651,
          "HKD": 1.171753,
          "HNL": 3.665001,
          "HRK": 1.048652,
          "HTG": 16.708439,
          "HUF": 54.818809,
          "IDR": 2170.511899,
          "ILS": 0.499309,
          "IMP": 0.122164,
          "INR": 11.598268,
          "IQD": 217.955856,
          "IRR": 6329.676966,
          "ISK": 19.151809,
          "JEP": 0.122164,
          "JMD": 23.027039,
          "JOD": 0.105849,
          "JPY": 18.973362,
          "KES": 17.429062,
          "KGS": 12.058289,
          "KHR": 606.245759,
          "KMF": 68.633759,
          "KPW": 134.356383,
          "KRW": 187.855612,
          "KWD": 0.045637,
          "KYD": 0.124311,
          "KZT": 64.933914,
          "LAK": 2007.881054,
          "LBP": 226.465144,
          "LKR": 52.958989,
          "LRD": 22.617216,
          "LSL": 2.340843,
          "LTL": 0.440799,
          "LVL": 0.090301,
          "LYD": 0.713638,
          "MAD": 1.479339,
          "MDL": 2.842039,
          "MGA": 594.527408,
          "MKD": 8.591898,
          "MMK": 276.216278,
          "MNT": 459.16593,
          "MOP": 1.206182,
          "MRO": 53.29466,
          "MUR": 6.467549,
          "MVR": 2.30571,
          "MWK": 121.742339,
          "MXN": 2.923172,
          "MYR": 0.653724,
          "MZN": 9.528907,
          "NAD": 2.3294,
          "NGN": 61.986105,
          "NIO": 5.351918,
          "NOK": 1.412646,
          "NPR": 18.524159,
          "NZD": 0.228673,
          "OMR": 0.057478,
          "PAB": 0.149173,
          "PEN": 0.546458,
          "PGK": 0.524046,
          "PHP": 7.811335,
          "PKR": 29.872448,
          "PLN": 0.635797,
          "PYG": 1024.496099,
          "QAR": 0.543552,
          "RON": 0.687383,
          "RSD": 16.333861,
          "RUB": 9.815493,
          "RWF": 153.464808,
          "SAR": 0.559966,
          "SBD": 1.213214,
          "SCR": 1.902024,
          "SDG": 67.99979,
          "SEK": 1.459691,
          "SGD": 0.205193,
          "SHP": 0.205626,
          "SLL": 1955.631361,
          "SOS": 87.033108,
          "SRD": 3.143715,
          "STD": 3089.894635,
          "SVC": 1.305344,
          "SYP": 375.070756,
          "SZL": 2.329389,
          "THB": 5.087682,
          "TJS": 1.84961,
          "TMT": 0.522497,
          "TND": 0.452936,
          "TOP": 0.345378,
          "TRY": 2.421107,
          "TTD": 1.012295,
          "TWD": 4.376181,
          "TZS": 347.385856,
          "UAH": 4.407588,
          "UGX": 554.228945,
          "USD": 0.149285,
          "UYU": 5.976971,
          "UZS": 1648.851029,
          "VEF": 31921609003.910606,
          "VND": 3463.03491,
          "VUV": 17.05813,
          "WST": 0.385057,
          "XAF": 91.468579,
          "XAG": 0.006751,
          "XAU": 8.0532786e-05,
          "XCD": 0.40345,
          "XDR": 0.110495,
          "XOF": 91.138928,
          "XPF": 16.675653,
          "YER": 37.358584,
          "ZAR": 2.323839,
          "ZMK": 1343.743174,
          "ZMW": 2.569746,
          "ZWL": 48.069655
      }
  };
  }

  getNsOnlinePrice(): Observable<RegionPrice[]> {
    var httpOptions = {
      headers: new HttpHeaders()
    }
    var apiUrl=null ;
    if(apiUrl==null){
      apiUrl="https://nsonlineprice.wangshuai.app/api";
      // apiUrl="http://192.168.1.106:8787/";
    }

   httpOptions.headers= httpOptions.headers.set('Access-Control-Allow-Origin', '*');
    // httpOptions.headers=httpOptions.headers.set('x-foo', 'x-foo');
    // if(httpOptions.headers.has('x-foo')){
    //   console.log("has x-foo");
    // }
    // else{
    //   console.log("not has x-foo");

    // }
    // console.log('current httpOptions:', httpOptions);
    // dataTemp.forEach(element => {
    //   element.listPrice.forEach(f => {
    //     var info= cnyPriceRate.rates[f.currency];
    //     f.cnyPrice=(info * parseInt(f.price)).toString();
    //   })
    // })

    return of(dataTemp);



    return this.httpClient.get<RegionPrice[]>(apiUrl, httpOptions).pipe(
      // tap(_ => this.log(`add hero w/ id =${_.id}`),
      //   catchError(this.handleError<RegionPrice>('addHero'))
      // )
    );

  }
}


