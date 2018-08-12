import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { IWarehouse } from '../../Models/IWarehouse';
import { IidValue } from '../../Models/IIdValue';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  constructor(private _settingService:SettingsService,) { }
  warehouses:IWarehouse[];
  message:string;
  ngOnInit() {
    this._settingService.getWarehouses()
    .subscribe(
      data => {
        this.warehouses = data as IWarehouse[];
      }, 
      err => this.message = err.friendlyMessage);
  }
  onKeydown(warehouse:IWarehouse,event: any,typeInput:string){
    let newValue=event.target.value;
    if(newValue===warehouse.name || newValue===warehouse.status || newValue===warehouse.description) return;

    let idValue:IidValue={id:warehouse.id,value:event.target.value,type:typeInput };

    this._settingService.updateWarehouse(idValue)
    .subscribe(
      data => {
        this.message="The value was changed.";
      }, 
      err => this.message = err.friendlyMessage);
  }
  resetMessage(){
    this.message="";
  }
}
