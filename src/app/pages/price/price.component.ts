import { priceInfo } from './../../app.service';
import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridModule } from 'devextreme-angular';

import { Service, RegionPrice } from '../../app.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less'],
  providers: [Service]
})
export class PriceComponent {
  employees: priceInfo[];
  formatter=new Intl.NumberFormat('zh-cn', {
    style: 'currency',
    currency: 'CNY',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  constructor(service: Service) {
    this.employees = new Array<priceInfo>();

    service.getNsOnlinePrice().subscribe(data => this.employees = data.flatMap(x => {
      x.listPrice.forEach(y => y.regionName = x.regionName);
      return x.listPrice;
    }));
    // console.log('emp is :',this.employees);

  }
  getPriceDesc(price: priceInfo) {
    if (this.formatter == null) {
      this.formatter = new Intl.NumberFormat('zh-cn', {
        style: 'currency',
        currency: 'CNY',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });
      console.log('formatter init');

    }
    return this.formatter.format(parseFloat(price.cnyPrice));
  }
}

// @NgModule({
//   imports: [
//     BrowserModule,
//     DxDataGridModule,
//   ],
//   bootstrap: [PriceComponent],
// })
// export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
