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

  public token: string;
  public tokenExpiration: Date;

  currentUser:IUser;

  public login(creds:ICredential) {
    return this.http.post<Token>(HttpClientBaseService.rootUrl+"auth/token", creds)
    .pipe(map(response => {
      this.token = response.token;
      this.tokenExpiration = response.expiration;
      this.change.emit(false);
      this._cookieService.set("token",response.token);
      this._cookieService.set("tokenExpiration",response.expiration.toString());
      return true;
    }));
  }
  public logout() {
    this.token=undefined;
    this.tokenExpiration=null;
    this.change.emit(true);
    this._cookieService.deleteAll();
    //this.currentUser.userName=undefined;
  }
  public getCurrentUser(): Observable<any|HttpError>{
    return this.http.get<any>(HttpClientBaseService.rootUrl+"auth/currentuser")
    .pipe(tap(()=>{
      this.token=this._cookieService.get("token");
      this.tokenExpiration= new Date(this._cookieService.get("tokenExpiration"));
      this.change.emit(false);
    }))
    .pipe(catchError(err=>this.handleError(err)));
  }
  @Output() change: EventEmitter<boolean> = new EventEmitter();
}
