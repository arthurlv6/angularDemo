import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpRequest, HttpHandler, HttpEvent } from  '@angular/common/http';
import { HttpCacheService } from './http-cache.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheInterceptor implements HttpInterceptor{

  constructor(private _cacheService: HttpCacheService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // pass along non-cacheable requests and invalidate cache
    if(req.method !== 'GET' || req.url.indexOf('currentuser')>0) {
      //console.log(`Invalidating cache: ${req.method} ${req.url}`);
      this._cacheService.invalidateCache();
      return next.handle(req);
    }

    // attempt to retrieve a cached response
    const cachedResponse: HttpResponse<any> = this._cacheService.get(req.url);

    // return cached response
    if (cachedResponse) {
      //console.log(`Returning a cached response: ${cachedResponse.url}`);
      //console.log(cachedResponse);
      return of(cachedResponse);
    }

    // send request to server and add response to cache
    return next.handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            //console.log(`Adding item to cache: ${req.url}`);
            this._cacheService.put(req.url, event);
          }
        })
      );
  }
}
