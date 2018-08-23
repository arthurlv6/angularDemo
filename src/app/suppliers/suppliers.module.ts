import { NgModule } from '@angular/core';
import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { AppCommonModule } from '../Shared/app-common.module';
import { SuppliersService } from './suppliers.service';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierDetailModalComponent } from './supplier-detail-modal.component';
import { SupplierAddEditComponent } from './supplier-add-edit.component';
import { PaginationModule } from 'ngx-bootstrap';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/suppliers.reducer';

@NgModule({
  imports: [
    SuppliersRoutingModule,
    AppCommonModule,
    PaginationModule.forRoot(),
    StoreModule.forFeature('suppliers',reducer),
  ],
  declarations: [
    SuppliersComponent,
    SupplierDetailComponent,
    SupplierDetailModalComponent,
    SupplierAddEditComponent,
  ],
  providers:[
    SuppliersService
  ],
})
export class SuppliersModule { }
