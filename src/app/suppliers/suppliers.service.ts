import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClientBaseService } from '../Shared/http-client-base.service';
import { ISupplier } from '../Models/isupplier';
import { catchError } from 'rxjs/operators';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { HttpError } from '../Models/http-error';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService extends HttpClientBaseService {

  constructor(private http: HttpClient) {
    super();
   }
   getSuppliers(name?: string,sort?:string,pageSize=10, pageNumber=1): Observable<any> {
    var extral: string = this.getQueryString(name,sort, pageNumber, pageSize);
    var url=HttpClientBaseService.rootUrl+"suppliers"+extral;
    return this.http.get(url);
  }
  private getQueryString(name: string, sort:string, pageNumber: number, pageSize: number) {
    var extral: string = "";
    if(typeof(name) == 'undefined' || name == null){
      name="";
    }
    if(typeof(sort) == 'undefined' || sort == null){
      sort="";
    }
    extral += "?name=" + name;
    extral += "&sort=" + sort;
    extral += "&pageNumber=" + pageNumber || 1;
    extral += "&pageSize=" + pageSize;
    return extral;
  }

  getSupplier(id:number):Observable<ISupplier|HttpError>{
    var url=HttpClientBaseService.rootUrl+"suppliers/"+id;
    return this.http.get<ISupplier>(url)
    .pipe(catchError(err=>this.handleError(err)));
  }

  getTotal(name?: string):Observable<any>{
    if(typeof(name) == 'undefined' || name == null){
      name="";
    }
    var url=HttpClientBaseService.rootUrl+"suppliers/total?name="+name;
    return this.http.get<ISupplier>(url)
    .pipe(catchError(err=>this.handleError(err)));
  }
  addSupplier(supplier:ISupplier):Observable<ISupplier>{
    var url=HttpClientBaseService.rootUrl+"suppliers";
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<ISupplier>(url,supplier,{ headers });
  }
  updateSupplier(supplier:ISupplier):Observable<void|HttpError>{
    var url=HttpClientBaseService.rootUrl+"suppliers/"+supplier.id;
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(url,supplier,{ headers })
    .pipe(catchError(err=>this.handleError(err)));
  }
  deleteSuppler(id:number):Observable<void|HttpError>{
    var url=HttpClientBaseService.rootUrl+"suppliers/"+id;
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete<void>(url)
    .pipe(catchError(err=>this.handleError(err)));
  }
}
