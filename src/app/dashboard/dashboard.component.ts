import { Component, OnInit } from '@angular/core';
import { AppCommonService } from '../Shared/app-common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _appCommonServie:AppCommonService
  ) { }
  ngOnInit() {
    this._appCommonServie.setupTitle("Dashboard");
  }
}
