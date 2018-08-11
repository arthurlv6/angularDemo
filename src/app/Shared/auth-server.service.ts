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
  currentUser:IUser;

  public login(creds:ICredential) {
    return this.http.post<Token>(HttpClientBaseService.rootUrl+"auth/token", creds)
    .pipe(map(response => {
      this._cookieService.set("token",response.token);
      this._cookieService.set("tokenExpiration",response.expiration.toString());
      this._cookieService.set("roles",response.roles.toString());
      this.change.emit(false);//not need login
      return true;
    }));
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
