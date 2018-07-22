import { Component, OnInit } from '@angular/core';
import { AuthServerService } from './Shared/auth-server.service';
import { Router } from '@angular/router';
import { ICredential } from './Models/icredential';
import { AppCommonService } from './Shared/app-common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    private _authService: AuthServerService, 
    private router: Router,
  private _appCommonService: AppCommonService) { }
    loading:boolean=false;
  ngOnInit() {
    this._appCommonService.setupTitle("Login");
  }
  errorMessage: string = "";
  public creds:ICredential = {
    username: "arthur.lv6@gmail.com",
    password: "Tomhack!123"
  };
  onLogin() {
    this.loading=true;
    this._authService.login(this.creds)
      .subscribe(
        success => {
          this.loading=false;
            this.router.navigate(["suppliers"]);
        },
       err => {
         this.errorMessage = "Failed to login";
         this.loading=false;
        });
  }
}
