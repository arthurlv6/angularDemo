import { NgModule } from '@angular/core';

import { ProductsModuleRoutingModule } from './products-module-routing.module';
import { ProductsComponent } from './products.component';
import { TabsModule } from 'ngx-bootstrap';
import { ProductDetailComponent } from './product-detail.component';
import { AppCommonModule } from '../Shared/app-common.module';
import { SupplierDetailModalComponent } from '../suppliers/supplier-detail-modal.component';

@NgModule({
  imports: [
    AppCommonModule,
    ProductsModuleRoutingModule,
    TabsModule.forRoot(),
  ],
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
  ],
  entryComponents:[
    SupplierDetailModalComponent
  ]
})
export class ProductsModuleModule { }
