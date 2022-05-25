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

  constructor(service: Service) {
    this.employees = service.getNsOnlinePrice().flatMap(c=>c.listPrice);
    console.log('emp is :',this.employees);

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
