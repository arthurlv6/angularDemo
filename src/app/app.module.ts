
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsDropdownModule,CollapseModule,ModalModule,TabsModule,   } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login.component';
import { ProductsModule } from './products/products-module.module';
import { AuthServerService } from './Shared/auth-server.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { AppCommonModule } from './Shared/app-common.module';
import { UnfinishedComponent } from './unfinished.component';
import { SettingsModule } from './settings/settings.module';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    UnfinishedComponent,
  ],
  imports: [
    AppCommonModule,
    ProductsModule,
    SuppliersModule,
    SettingsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
  ],
  providers: [
    AuthServerService
  ],
  exports:[
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
