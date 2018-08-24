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
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NotifierModule.withConfig(customNotifierOptions),
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
    ReactiveFormsModule,
    NgxSpinnerModule,
    NotifierModule,
  ],
  providers:[
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpCacheInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpAddHeaderInterceptor, multi: true },
  ]
})
export class AppCommonModule { 
}
