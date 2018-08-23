import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { CompanyComponent } from './company.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings.component';
import { AppCommonModule } from '../Shared/app-common.module';
import { SettingsService } from './settings.service';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { CategoriesComponent } from './categories/categories.component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot()
  ],
  declarations: 
  [
    CompanyComponent, 
    UsersComponent, 
    SettingsComponent, 
    WarehouseComponent, 
    CategoriesComponent
  ],
  providers:[SettingsService],
  exports:[
  ]
})
export class SettingsModule { }
