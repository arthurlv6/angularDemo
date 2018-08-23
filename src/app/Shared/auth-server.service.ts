import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Token } from '../Models/token';
import { HttpClientBaseService } from './http-client-base.service';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../Models/iuser';
import { ICredential } from '../Models/icredential';
import { Observable } from 'rxjs';
import { HttpError } from '../Models/http-error';

@Injectable({
  providedIn: 'root'
})
export class AuthServerService extends HttpClientBaseService {

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService,
  ) {
    super();
   }
  url:string;
  public login(creds:ICredential) {
    return this.http.post<Token>(HttpClientBaseService.rootUrl+"auth/token", creds)
    .pipe(map(response => {
      this._cookieService.set("token",response.token);
      this._cookieService.set("tokenExpiration", response.expiration.toString());
      //roles need to sort
      this._cookieService.set("roles",this.OrderRoles(response.roles).toString());
      this.change.emit(false);//not need login
      return true;
    }));
  }
  OrderRoles(roles:string[]):string[]{
    let newOrderedRoles:string[]=[];
    if(roles.some(d=>d==="Settings")){
      newOrderedRoles.push("Settings");
    }
    if(roles.some(d=>d==="Products")){
      newOrderedRoles.push("Products");
    }
    if(roles.some(d=>d==="Inventories")){
      newOrderedRoles.push("Inventories");
    }
    if(roles.some(d=>d==="Suppliers")){
      newOrderedRoles.push("Suppliers");
    }
    if(roles.some(d=>d==="Purchases")){
      newOrderedRoles.push("Purchases");
    }
    if(roles.some(d=>d==="Customers")){
      newOrderedRoles.push("Customers");
    }
    if(roles.some(d=>d==="Reports")){
      newOrderedRoles.push("Reports");
    }
    /*
    if(roles.some(d=>d==="Website")){
      newOrderedRoles.push("Website");
    }*/
    return newOrderedRoles;
  }
  public logout() {
    this._cookieService.deleteAll();
    this.change.emit(true);
  }
  public getCurrentUser(): Observable<any|HttpError>{
    return this.http.get<any>(HttpClientBaseService.rootUrl+"auth/currentuser")
    .pipe(tap(()=>{
      this.change.emit(false);
    }))
    .pipe(catchError(err=>this.handleError(err)));
  }
  @Output() change: EventEmitter<boolean> = new EventEmitter();
}
