import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Shared/auth.guard';
import { CompanyComponent } from './company.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: SettingsComponent,
    children: [
      { path: '', redirectTo: 'company', pathMatch: 'full' },
      {
        path: 'company',
        canActivate: [AuthGuard],
        component: CompanyComponent
      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        component: UsersComponent
      },
      {
        path: 'warehouse',
        canActivate: [AuthGuard],
        component: WarehouseComponent
      },
      {
        path: 'categories',
        canActivate: [AuthGuard],
        component: CategoriesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
