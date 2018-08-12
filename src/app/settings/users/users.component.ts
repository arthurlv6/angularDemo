import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { IUser, Role } from '../../Models/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private _settingService:SettingsService,) { }
  users:IUser[];
  errorMessage:string;
  roles:string[];
  ngOnInit() {
    this._settingService.getUsers()
    .subscribe(
      data => {
        this.users = data as IUser[];
        this.roles="Purchases,Website,Customers,Settings,Inventories,Suppliers,Sales,Reports,Products".split(",");
        console.info(this.roles);
      }, 
      err => this.errorMessage = err.errorMessage);
  }
  onKeydown(user:IUser,event: any,type:String){
    console.warn(type);
    console.info(user.email);
    console.info(event.target.value);
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
  onChange(role:Role,event:any)
  {}
}
