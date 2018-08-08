import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpError } from '../Models/http-error';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class HttpClientBaseService {
    static version: string;
    //http://localhost:57989
    //http://api.angular.arthurdid.net
    static rootUrl: string = "http://localhost:57989/api/";
    protected getDefaultRequestHeaders(storeId?: string) {
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        if (storeId) {
            headers = headers.set('B2B-StoreId', storeId);
        }
        return headers;
    }

    handleError(error:HttpErrorResponse):Observable<HttpError>{
        let dataError = new HttpError();
        dataError.errorNumber = error.status;
        dataError.message = error.statusText;
        dataError.friendlyMessage = 'An error occurred. Please contact your admin.';
        return throwError(dataError);
    }
}