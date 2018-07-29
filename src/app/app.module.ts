
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule,CollapseModule,ModalModule,TabsModule,   } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login.component';
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
    AppCommonModule,
    ProductsModuleModule,
    SuppliersModule,
    AppRoutingModule,
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
