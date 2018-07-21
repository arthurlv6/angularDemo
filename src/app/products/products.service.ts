import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../Models/Product';
import { HttpClientBaseService } from '../Shared/http-client-base.service';
import { HttpError } from '../Models/http-error';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends HttpClientBaseService {

  constructor(private http: HttpClient) {
    super();
   }
   getProducts(name?: string,pageSize?: number, pageNumber?: number): Observable<Product[] | HttpError> {
    var extral: string = "";
    if (name) {
      extral +="?name='"+name+"'";
    }
    if (pageNumber) {
      extral += "&pageNumber="+pageNumber;
    }
    if (pageSize) {
      extral += "&pageSize="+pageSize;
    }
    var url=HttpClientBaseService.rootUrl+"products"+extral;
    return this.http.get<Product[]>(url).pipe(catchError(err=>this.handleError(err)));
  }
}
