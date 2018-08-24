import { Component, OnInit, Injector } from '@angular/core';
import { SettingsService } from '../settings.service';
import { IUser, Role } from '../../Models/iuser';
import { IidValue } from '../../Models/IIdValue';
import { BaseComponent } from '../../Shared/base-component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent implements OnInit {

  constructor(
    private _settingService:SettingsService,
    private injector: Injector,) {
    super(injector);
   }
  users:IUser[];
  roles:string[];
  ngOnInit() {
    this._spinner.show();
    this._settingService.getUsers()
    .subscribe(
      data => {
        this.users = data as IUser[];
        this.roles="Purchases,Website,Customers,Settings,Inventories,Suppliers,Sales,Reports,Products".split(",");
        console.info(this.roles);
      }, 
      err => this._notifierService.notify("warning",err.friendlyMessage),
      ()=>{
        this._spinner.hide();
      });
  }

  onKeydown(user:IUser,event: any,typeInput:string){
    this._spinner.show();
    let idValue:IidValue={id:user.id,value:event.target.value,type:typeInput };

    this._settingService.updateUser(idValue)
    .subscribe(
      data => {
        this._notifierService.notify("success","The change was saved.");
      }, 
      err => this._notifierService.notify("warning",err.friendlyMessage),
      ()=>{
        this._spinner.hide();
      })
  }

  onFilterChange(event:any){
    console.info(event.target.value);
  }
  checkRole(role:string,roles:Role[]):boolean{
    var index=roles.some(d=>d.name===role)
    if(index){
      return true;
    }
    else{
      return false;
    }
  }
  onChange(role:string,event:any,user:IUser)
  {
    event.target.defaultValue;

    let idValue:IidValue={id:user.id,value:event.target.defaultValue,type:role };
    this._settingService.updateUser(idValue)
    .subscribe(
      data => {
        this._notifierService.notify("success","The change was saved.");
      }, 
      err => this._notifierService.notify("warning",err.friendlyMessage)
    )
  }
}
