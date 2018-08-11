import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { CompanyComponent } from './company.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings.component';
import { AppCommonModule } from '../Shared/app-common.module';
import { WarehouseComponent } from './warehouse.component';
import { SettingsService } from './settings.service';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule 
  ],
  declarations: 
  [
    CompanyComponent, 
    UsersComponent, 
    SettingsComponent, 
    WarehouseComponent
  ],
  providers:[SettingsService],
  exports:[
  ]
})
export class SettingsModule { }
