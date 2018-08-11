import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuppliersComponent } from './suppliers.component';
import { SupplierDetailComponent } from './supplier-detail.component';
import { IdGuard } from '../Shared/id.guard';
import { AuthGuard } from '../Shared/auth.guard';
import { SupplierAddEditComponent } from './supplier-add-edit.component';

const routes: Routes = [
  {
    path: 'suppliers/:id',
    pathMatch: 'full',
    canActivate: [IdGuard, AuthGuard],
    component: SupplierDetailComponent
  },
  {
    path: 'suppliers',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: SuppliersComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  entryComponents:[SupplierAddEditComponent]
})
export class SuppliersRoutingModule { }
