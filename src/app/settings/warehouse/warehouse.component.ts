import { Component, OnInit, Injector } from '@angular/core';
import { SettingsService } from '../settings.service';
import { IWarehouse } from '../../Models/IWarehouse';
import { IidValue } from '../../Models/IIdValue';
import { BaseComponent } from '../../Shared/base-component';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent extends BaseComponent implements OnInit {

  constructor(private _settingService:SettingsService,private injector: Injector,) { super(injector);}
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
        this._notifierService.notify("success","The value was changed.");
      }, 
      err => this._notifierService.notify("warning",err.friendlyMessage)
    );
  }
}
