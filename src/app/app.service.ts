import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";


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

const regions: Region[] = [
  {
    name: "香港",
    url: "https://ec.nintendo.com/api/HK/zh/guest_prices"
  }
  // ,
  // {
  //   name: "俄罗斯",
  //   url: "https://ec.nintendo.com/api/RU/ru/guest_prices"
  // },
  // {
  //   name: "美国",
  //   url: "https://ec.nintendo.com/api/US/en/guest_prices"
  // },
  // {
  //   name: "日本",
  //   url: "https://ec.nintendo.com/api/JP/ja/guest_prices"
  // }
];
const uidInfos: UidInfo[] =
  [
    {
      uid: 70080000000585,
      range: "1個月 (30天)",
      name: "个人普通会员"
    },
    {
      uid: 70080000000586,
      range: "3個月 (90天)",
      name: "个人普通会员"
    },
    {
      uid: 70080000000587,
      range: "12個月 (365天)",
      name: "个人普通会员"
    },
    {
      uid: 70080000000589,
      range: "12個月 (365天)",
      name: "家庭普通会员"
    },
    {
      uid: 70080000000981,
      range: "12個月 (365天)",
      name: "个人高级会员"
    },
    {
      uid: 70080000000982,
      range: "12個月 (365天)",
      name: "家庭高级会员"
    }
  ];

var dataTemp = [
  {
    "contents": [],
    "id": 70080000000585,
    "is_owned": false,
    "is_self_owned": false,
    "is_sold_ondevice": true,
    "price": {
      "gold_point": {
        "basic_gift_gp": "0",
        "basic_gift_rate": "0",
        "consume_gp": "0",
        "extra_gold_points": [],
        "gift_gp": "0",
        "gift_rate": "0"
      },
      "no_gift_gold_point": true,
      "offer_prices": [],
      "regular_price": {
        "currency": "HKD",
        "formatted_value": "HKD 25",
        "id": 2196704500,
        "raw_value": "25"
      }
    },
    "sales_status": "onsale",
    "trade_rates": []
  },
  {
    "contents": [],
    "id": 70080000000586,
    "is_owned": false,
    "is_self_owned": false,
    "is_sold_ondevice": true,
    "price": {
      "gold_point": {
        "basic_gift_gp": "0",
        "basic_gift_rate": "0",
        "consume_gp": "0",
        "extra_gold_points": [],
        "gift_gp": "0",
        "gift_rate": "0"
      },
      "no_gift_gold_point": true,
      "offer_prices": [],
      "regular_price": {
        "currency": "HKD",
        "formatted_value": "HKD 65",
        "id": 2196704800,
        "raw_value": "65"
      }
    },
    "sales_status": "onsale",
    "trade_rates": []
  },
  {
    "contents": [],
    "id": 70080000000587,
    "is_owned": false,
    "is_self_owned": false,
    "is_sold_ondevice": true,
    "price": {
      "gold_point": {
        "basic_gift_gp": "0",
        "basic_gift_rate": "0",
        "consume_gp": "0",
        "extra_gold_points": [],
        "gift_gp": "0",
        "gift_rate": "0"
      },
      "no_gift_gold_point": true,
      "offer_prices": [],
      "regular_price": {
        "currency": "HKD",
        "formatted_value": "HKD 155",
        "id": 2196705100,
        "raw_value": "155"
      }
    },
    "sales_status": "onsale",
    "trade_rates": []
  },
  {
    "contents": [],
    "id": 70080000000589,
    "is_owned": false,
    "is_self_owned": false,
    "is_sold_ondevice": true,
    "price": {
      "gold_point": {
        "basic_gift_gp": "0",
        "basic_gift_rate": "0",
        "consume_gp": "0",
        "extra_gold_points": [],
        "gift_gp": "0",
        "gift_rate": "0"
      },
      "no_gift_gold_point": true,
      "offer_prices": [],
      "regular_price": {
        "currency": "HKD",
        "formatted_value": "HKD 295",
        "id": 2196779200,
        "raw_value": "295"
      }
    },
    "sales_status": "onsale",
    "trade_rates": [
      {
        "course_id": "7fb703910f7e823d",
        "currency": "HKD",
        "id": 61,
        "unit_minutes": 7200,
        "value": "2"
      }
    ]
  },
  {
    "contents": [],
    "id": 70080000000981,
    "is_owned": false,
    "is_self_owned": false,
    "is_sold_ondevice": true,
    "price": {
      "gold_point": {
        "basic_gift_gp": "0",
        "basic_gift_rate": "0",
        "consume_gp": "0",
        "extra_gold_points": [],
        "gift_gp": "0",
        "gift_rate": "0"
      },
      "no_gift_gold_point": true,
      "offer_prices": [],
      "regular_price": {
        "currency": "HKD",
        "formatted_value": "HKD 325",
        "id": 2269431300,
        "raw_value": "325"
      }
    },
    "sales_status": "onsale",
    "trade_rates": [
      {
        "course_id": "7fb703910f7e823d",
        "currency": "HKD",
        "id": 221,
        "unit_minutes": 7200,
        "value": "2"
      }
    ]
  },
  {
    "contents": [],
    "id": 70080000000982,
    "is_owned": false,
    "is_self_owned": false,
    "is_sold_ondevice": true,
    "price": {
      "gold_point": {
        "basic_gift_gp": "0",
        "basic_gift_rate": "0",
        "consume_gp": "0",
        "extra_gold_points": [],
        "gift_gp": "0",
        "gift_rate": "0"
      },
      "no_gift_gold_point": true,
      "offer_prices": [],
      "regular_price": {
        "currency": "HKD",
        "formatted_value": "HKD 575",
        "id": 2269438700,
        "raw_value": "575"
      }
    },
    "sales_status": "onsale",
    "trade_rates": [
      {
        "course_id": "d97067bbfb3cf1d0",
        "currency": "HKD",
        "id": 223,
        "unit_minutes": 7200,
        "value": "4"
      },
      {
        "course_id": "c3df9efd3d821bc7",
        "currency": "HKD",
        "id": 224,
        "unit_minutes": 7200,
        "value": "4"
      },
      {
        "course_id": "7fb703910f7e823d",
        "currency": "HKD",
        "id": 225,
        "unit_minutes": 7200,
        "value": "2"
      }
    ]
  }
];

@Injectable()
export class Service {
  constructor(private httpClient: HttpClient) { }

  getNsOnlinePrice(): RegionPrice[] {
    const httpOptions = {
      headers: new HttpHeaders()
    }

    httpOptions.headers.append('Access-Control-Allow-Origin', '*');

    var params = new HttpParams();
    // https://ec.nintendo.com/api/jp/es/guest_prices?
    uidInfos.forEach(uidInfo => {
      params = params.append('ns_uids', uidInfo.uid.toString());
    })
    var result = regions.map(region => {
      var regionPrice: RegionPrice = { regionName: region.name, listPrice: [] };
      // this.httpClient.get(region.url + "?" + params, httpOptions).subscribe((data: any) => {
      //   console.log('data:', data);
      //   regionPrice.listPrice = data.map((p: { id: number; price: { regular_price: { currency: any; formatted_value: any; }; }; }) => {
      //     var currentInfo = uidInfos.find(f => f.uid == p.id);
      //     if (currentInfo == null) currentInfo = { name: "", range: "", uid: 0 };
      //     return { name: currentInfo.name, range: currentInfo.range, currency: p.price.regular_price.currency, price: p.price.regular_price.formatted_value };
      //   });
      // });
      var data = dataTemp;
      console.log('data:', data);
      regionPrice.listPrice = data.map((p: { id: number; price: { regular_price: { currency: any; formatted_value: any; }; }; }) => {
        var currentInfo = uidInfos.find(f => f.uid == p.id);
        if (currentInfo == null) currentInfo = { name: "", range: "", uid: 0 };
        return { name: currentInfo.name, range: currentInfo.range, currency: p.price.regular_price.currency, price: p.price.regular_price.formatted_value };
      });
      ;
      return regionPrice;
    });
    return result;
  }
}


