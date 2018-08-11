import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import { CompanyComponent } from '../settings/company.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings.component';
import { AppCommonModule } from '../Shared/app-common.module';

@NgModule({
  imports: [
    CommonModule,
    AppCommonModule,
    SettingsRoutingModule
  ],
  declarations: [CompanyComponent, UsersComponent, SettingsComponent]
})
export class SettingsModule { }
