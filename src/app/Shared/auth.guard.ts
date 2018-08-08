import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServerService } from './auth-server.service';
import { AppCommonService } from './app-common.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthServerService,
    private _appCommonService:AppCommonService,) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this._authService.token===undefined){
        this._router.navigate(['/login']);
        return false;
      }
      this._appCommonService.linkClick();
    return true;
  }
}
