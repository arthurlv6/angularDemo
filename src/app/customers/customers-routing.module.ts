import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Shared/auth.guard';
import { CustomersComponent } from './customers.component';

const routes: Routes = [

  {
    path: 'customers',
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: CustomersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
