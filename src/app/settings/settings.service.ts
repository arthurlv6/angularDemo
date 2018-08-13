import { Injectable } from '@angular/core';
import { HttpClientBaseService } from '../Shared/http-client-base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICompany } from '../Models/ICompany';
import { HttpError } from '../Models/http-error';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from '../Models/iuser';
import { IWarehouse } from '../Models/IWarehouse';
import { IidValue } from '../Models/IIdValue';
import { ICategory } from '../Models/ICategory';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends HttpClientBaseService {

  constructor(private http: HttpClient) {
    super();
   }
   getCompany(): Observable<ICompany | HttpError> {
    var url=HttpClientBaseService.rootUrl+"companies";
    return this.http.get<ICompany>(url).pipe(catchError(err=>this.handleError(err)));
  }
  updateCompany(company:ICompany):Observable<void|HttpError>{
    var url=HttpClientBaseService.rootUrl+"companies/"+company.id;
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(url,company,{ headers })
    .pipe(catchError(err=>this.handleError(err)));
  }

  //users
  getUsers(): Observable<IUser[] | HttpError> {
    var url=HttpClientBaseService.rootUrl+"users";
    return this.http.get<IUser[]>(url).pipe(catchError(err=>this.handleError(err)));
  }
  //warehouse
  getWarehouses(): Observable<IWarehouse[] | HttpError> {
    var url=HttpClientBaseService.rootUrl+"warehouses";
    return this.http.get<IWarehouse[]>(url).pipe(catchError(err=>this.handleError(err)));
  }
  updateWarehouse(idValue:IidValue):Observable<void|HttpError>{
    var url=HttpClientBaseService.rootUrl+"warehouses/"+idValue.id;
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(url,idValue,{ headers })
    .pipe(catchError(err=>this.handleError(err)));
  }
  //caegory
  getCategories(): Observable<ICategory[] | HttpError> {
    var url=HttpClientBaseService.rootUrl+"productcategories";
    return this.http.get<ICategory[]>(url).pipe(catchError(err=>this.handleError(err)));
  }
  updateCategory(idValue:IidValue):Observable<void|HttpError>{
    var url=HttpClientBaseService.rootUrl+"productcategories/"+idValue.id;
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<void>(url,idValue,{ headers })
    .pipe(catchError(err=>this.handleError(err)));
  }
}
