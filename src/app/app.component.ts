import { Component, OnInit } from '@angular/core';
import { AuthServerService } from './Shared/auth-server.service';
import { HttpError } from './Models/http-error';
import { Router } from '@angular/router';
import { AppCommonService } from './Shared/app-common.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent implements OnInit {
  loginRequired:boolean=false;
  title = 'app';
  roles:string[];
  constructor(
    private _authService: AuthServerService,
    private router :Router,
    private _appCommonService: AppCommonService,
    private _cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    //console.info(this.roles);
    let expiredDate=this._cookieService.get("tokenExpiration");

    if( expiredDate === undefined || (new Date(expiredDate)) < new Date )
    {
      this.loginRequired=true;
    }else{
      this.loginRequired=false;
      this.roles=this._cookieService.get("roles").split(",");
    }

    this._authService.getCurrentUser().subscribe(
      ()=>{
        this.router.navigate(["dashboard"]);
      },
      (err:HttpError)=>{
        this.router.navigate(["login"]);
      }
    );
    this._authService.change.subscribe(r => {
      this.loginRequired=r;
      this.roles=this._cookieService.get("roles").split(",");
    });

    this._appCommonService.linkClickDone.subscribe(() => {
      this.menuShow=false;
    });
  }

  logout():void{
    this._authService.logout();
    this.router.navigate(["login"]);
  }
  menuShow:boolean =false;
  showMenu():void{
    this.menuShow=!this.menuShow;
    this.smallLeftMenu=false;
  }
  smallLeftMenu:boolean =false;
  minimizeLeftMenu():void{
    this.smallLeftMenu=!this.smallLeftMenu;
  }
}
