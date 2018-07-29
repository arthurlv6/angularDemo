import { Component, OnInit } from '@angular/core';
import { AppCommonService } from '../Shared/app-common.service';
import {data,pieData} from './demodata';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _appCommonServie:AppCommonService
  ) { 

    Object.assign(this, { data })
    Object.assign(this, { pieData })
  }
  ngOnInit() {
    this._appCommonServie.setupTitle("Dashboard");
  }
  data: any[];
  pieData: any[];
  
  view: any[] = [];
  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Sales';
  showYAxisLabel = true;
  yAxisLabel = 'Money';

  colorScheme = {
    domain: ['#C7B42C', '#bb71e9', '#5AA454', '#AAAAAA']
  };

  onSelect(event) {
    console.log(event);
  }
}
