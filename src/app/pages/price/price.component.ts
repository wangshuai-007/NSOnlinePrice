import { priceInfo } from './../../app.service';
import { NgModule, Component, enableProdMode, ViewChild, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridComponent, DxDataGridModule } from 'devextreme-angular';

import { Service, RegionPrice } from '../../app.service';
import { from } from "linq-to-typescript"
import { DxiDataGridColumn } from 'devextreme-angular/ui/nested/base/data-grid-column-dxi';
import { Column } from 'devextreme/ui/data_grid';

// export interface PriceRowInfo{
//   region: string;
//   listCNYPrice: number[];

// }
const groupBy = <T, K extends keyof any>(list: T[], getKey: (item: T) => K) =>
  list.reduce((previous, currentItem) => {
    const group = getKey(currentItem);
    if (!previous[group]) previous[group] = [];
    previous[group].push(currentItem);
    return previous;
  }, {} as Record<K, T[]>);
@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.less'],
  providers: [Service]
})

// @Injectable()
export class PriceComponent {
  employees: priceInfo[];
  pricelist: any[] = [];
  columns: Array<any> = [];
  @ViewChild('dataGridVar', { static: false })
  dataGrid!: DxDataGridComponent;
  formatter = new Intl.NumberFormat('zh-cn', {
    style: 'currency',
    currency: 'CNY',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });


  constructor(private service: Service) {
    this.employees = new Array<priceInfo>();
    this.service.getNsOnlinePrice().subscribe(data => {
      this.employees = data.flatMap(x => {
        x.listPrice.forEach(y => y.regionName = x.regionName);

        // x.listPrice.reduce((preview, current) => {
        //   const key = current.groupId + '-' + current.range;

        //   const item = preview.get(key) || Object.assign({}, current, {
        //     used: 0,
        //     instances: 0
        //   });

        //   item.used += current.used;
        //   item.instances += current.instances;

        //   return preview.set(key, item);

        // },new Map() )

        // from(x.listPrice).groupBy(c=>c.regionName).select(s=>new {})
        return x.listPrice;
      });
      this.dataGrid?.columns?.slice(0);

      var arr = [
        {
          "groupId": "7fb703910f7e823d",
          "groupName": "个人会员",
          "membershipName": "普通会员",
          "isExtension": false,
          "isFamily": false,
        },
        {
          "groupId": "d97067bbfb3cf1d0",
          "groupName": "个人会员",
          "membershipName": "高级会员",
          "isExtension": true,
          "isFamily": false,
        },
        {
          "groupId": "c3df9efd3d821bc7",
          "groupName": "家庭会员",
          "membershipName": "普通会员",
          "isExtension": false,
          "isFamily": true,
        },

        {
          "groupId": "71de90a1cf1ae628",
          "groupName": "家庭会员",
          "membershipName": "高级会员",
          "isExtension": true,
          "isFamily": true,
        }
      ]
      console.log(arr);

      var columnInfo = [{ "dataField": "regionName", "caption": "地区", "groupName": "", "membershipName": "" }];
      //columnInfo.splice(0, 1);
      this.pricelist = from(this.employees).groupBy(c => c.regionName).select(s => {
        var returnTemp: any = {};
        returnTemp["regionName"] = s.key;
        arr.forEach(f => {
          console.log('s is ',s);


          s.toArray().filter(w => w.groupId == f.groupId).forEach(x => {
            console.log('x is ',x);
            var columnName = `${f.groupName}-${f.membershipName}-${x.range}`;
            returnTemp[columnName] = x.price;
            columnName += "-cny"
            returnTemp[columnName] = x.cnyPrice;
            console.log('returnTemp is ',returnTemp);

            if(!columnInfo.find(c=>c.dataField==columnName))
            columnInfo.push({ "dataField": columnName, "caption": x.range, "groupName": f.groupName, "membershipName": f.membershipName });
          })
        })

        return returnTemp;
      }).toArray();
      //add region
      this.columns.push(columnInfo[0]);
      from(arr).groupBy(g => g.groupName).each(f => {
      var listmidcol=  f.toArray().map(element => {
          var col=columnInfo.filter(c=>c.groupName==element.groupName&&c.membershipName==element.membershipName);
          var result=<Column>{caption:element.membershipName,columns:col.map(m=><Column>{caption:m.caption,dataField:m.dataField,calculateCellValue(rowData) {
            var price=rowData[m.dataField];
            if(!price)return"-";
            return new Intl.NumberFormat('zh-cn', {
              style: 'currency',
              currency: 'CNY'
            }).format(parseFloat(rowData[m.dataField]));
          }})};
          return result;
        });

        this.columns.push(<Column>{ isBand: true, caption: f.key,columns:listmidcol });
      }).toArray();
      // from(arr).each(f => {
      //   // var bandIndex = this.dataGrid.instance.getVisibleColumnIndex(f.groupName);
      //   this.columns.push(<Column>{ isBand: true, caption: f.membershipName, dataField: f.groupName });
      // }).toArray();
      // //from(priceList).groupBy(g => g.)
      // columnInfo.forEach(f => {
      //   // var bandindex = this.dataGrid.instance.columnOption(f.groupName, "dataField");
      //   this.columns.push(<Column>{ isBand: false, dataField: f.fieldname})
      // });
      this.dataGrid?.instance?.refresh();

    });
    // console.log('emp is :',this.employees);
  }

  ngAfterContentInit(): void {




    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }
  getPriceDesc(price: priceInfo) {
    if(this==null){
      return new Intl.NumberFormat('zh-cn', {
        style: 'currency',
        currency: 'CNY'
      }).format(parseFloat(price.cnyPrice));
    }


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
