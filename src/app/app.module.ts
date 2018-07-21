import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule,CollapseModule,ModalModule,TabsModule,   } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProductsModuleModule } from './products/products-module.module';
import { AuthServerService } from './Shared/auth-server.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AppCommonModule } from './Shared/app-common.module';
import { UnfinishedComponent } from './unfinished.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UnfinishedComponent,
  ],
  imports: [
    AngularFontAwesomeModule,
    BrowserModule,
    FormsModule,
    AppCommonModule,
    ProductsModuleModule,
    SuppliersModule,
    AppRoutingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
  ],
  providers: [
    AuthServerService
  ],
  exports:[
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
