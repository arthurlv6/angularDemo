import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppCommonService } from './app-common.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthServerService } from './auth-server.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _appCommonService:AppCommonService,
    private _cookieService: CookieService,
    private _authService:AuthServerService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      let expiredDate=this._cookieService.get("tokenExpiration");
      if( expiredDate === undefined || (new Date(expiredDate)) < new Date ){
        this._authService.url=state.url;
        this._router.navigate(['/login']);
        return false;
      }
      this._appCommonService.linkClick();
      this._appCommonService.setupTitle(state.url);
      console.log(state.url);
    return true;
  }
}
