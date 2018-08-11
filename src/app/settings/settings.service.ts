import { Injectable } from '@angular/core';
import { HttpClientBaseService } from '../Shared/http-client-base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICompany } from '../Models/ICompany';
import { HttpError } from '../Models/http-error';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
}
