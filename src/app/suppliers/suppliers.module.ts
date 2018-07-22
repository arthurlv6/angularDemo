import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import { AppCommonModule } from '../Shared/app-common.module';
import { SuppliersService } from './suppliers.service';
import { SupplierDetailComponent } from './supplier-detail.component';
import { SupplierDetailModalComponent } from './supplier-detail-modal.component';
import { SupplierAddEditComponent } from './supplier-add-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    AppCommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
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
