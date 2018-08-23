import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TitleComponent } from './title.component';
import { LoadingComponent } from './loading.component';
import { HttpCacheInterceptor } from './http-cache.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpAddHeaderInterceptor } from './http-add-header.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule 
  ],
  declarations: [
     TitleComponent,
     LoadingComponent
  ],
  exports:[
    CommonModule,
    FormsModule,
    TitleComponent,
    LoadingComponent,
    AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule 
  ],
  providers:[
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAddHeaderInterceptor, multi: true },
  ]
})
export class AppCommonModule { 
}
