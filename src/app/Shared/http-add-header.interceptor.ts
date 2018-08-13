import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
  })

export class HttpAddHeaderInterceptor implements HttpInterceptor{
    
    constructor(private _cookieService: CookieService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`AddHeaderInterceptor - ${req.url}`);
        let token=this._cookieService.get("token");
        let jsonReq: HttpRequest<any> = req.clone({
          setHeaders: {Authorization:'Bearer '+token,}
        });
        
        return next.handle(jsonReq);
      }
}
