import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from './title.component';
import { LoadingComponent } from './loading.component';
import { HttpCacheInterceptorInterceptor } from './http-cache-interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpAddHeaderInterceptor } from './http-add-header.interceptor';

@NgModule({
  imports: [
    CommonModule
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
  ],
  providers:[
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAddHeaderInterceptor, multi: true },
  ]
})
export class AppCommonModule { 
}
