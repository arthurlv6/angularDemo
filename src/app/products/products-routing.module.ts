import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { AuthGuard } from '../Shared/auth.guard';

const routes: Routes = [  {
  path:'products',
  canActivate:[AuthGuard],
  component:ProductsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
