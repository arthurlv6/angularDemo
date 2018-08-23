import { Injectable } from '@angular/core';
import { HttpClientBaseService } from '../Shared/http-client-base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpError } from '../Models/http-error';
import { ICustomer } from '../Models/ICustomer';
import { catchError } from '../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CustomersService extends HttpClientBaseService {

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

  getSupplier(id:number):Observable<ICustomer|HttpError>{
    var url=HttpClientBaseService.rootUrl+"suppliers/"+id;
    return this.http.get<ICustomer>(url)
    .pipe(catchError(err=>this.handleError(err)));
  }

  getTotal(name?: string):Observable<any>{
    if(typeof(name) == 'undefined' || name == null){
      name="";
    }
    var url=HttpClientBaseService.rootUrl+"suppliers/total?name="+name;
    return this.http.get<ICustomer>(url)
    .pipe(catchError(err=>this.handleError(err)));
  }
  addSupplier(customer:ICustomer):Observable<ICustomer>{
    var url=HttpClientBaseService.rootUrl+"suppliers";
    return this.http.post<ICustomer>(url,customer);
  }
  updateSupplier(customer:ICustomer):Observable<void|HttpError>{
    var url=HttpClientBaseService.rootUrl+"suppliers/"+customer.Id;
    return this.http.put<void>(url,customer)
    .pipe(catchError(err=>this.handleError(err)));
  }
  deleteSuppler(id:number):Observable<void|HttpError>{
    var url=HttpClientBaseService.rootUrl+"suppliers/"+id;
    return this.http.delete<void>(url)
    .pipe(catchError(err=>this.handleError(err)));
  }
}