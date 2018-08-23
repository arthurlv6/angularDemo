
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
import { CustomersModule } from './customers/customers.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
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
    CustomersModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Demo app devtools',
      maxAge:30,
      logOnly:environment.production
    }),
  ],
  providers: [
    AuthServerService
  ],
  exports:[
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
