import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { AppCommonModule } from '../Shared/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    AppCommonModule,
  ],
  declarations: [
    CustomersComponent,
  ]
})
export class CustomersModule { }
