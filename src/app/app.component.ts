import { Component, OnInit } from '@angular/core';
import { AuthServerService } from './Shared/auth-server.service';
import { HttpError } from './Models/http-error';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[]
})
export class AppComponent implements OnInit {
  loginRequired:boolean=(this._authService.token===undefined);

  title = 'app';
  constructor(
    private _authService: AuthServerService,
    private router :Router
  ) {}
  ngOnInit(): void {
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
    });
  }
  logout():void{
    this._authService.logout();
    this.router.navigate(["login"]);
  }
}
