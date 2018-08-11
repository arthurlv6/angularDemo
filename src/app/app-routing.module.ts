import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login.component';
import { UnfinishedComponent } from './unfinished.component';
import { AuthGuard } from './Shared/auth.guard';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products-module.module';
import { SettingsModule } from './settings/settings.module';

const routes: Routes = [
  
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'inventories',
    canActivate: [AuthGuard],
    component: UnfinishedComponent
  },
  {
    path: 'purchases',
    canActivate: [AuthGuard],
    component: UnfinishedComponent
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    component: UnfinishedComponent
  },
  {
    path: 'sales',
    canActivate: [AuthGuard],
    component: UnfinishedComponent
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    component: UnfinishedComponent
  },
  {
    path: 'website',
    canActivate: [AuthGuard],
    component: UnfinishedComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'settings',
    loadChildren:()=>SettingsModule
  },
  {
    path:'products',
    loadChildren:()=>ProductsModule
  },
  {
    path:'suppliers',
    loadChildren:()=>SuppliersModule
  },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {path:'**',redirectTo:'dashboard'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{enableTracing:true, preloadingStrategy:PreloadAllModules}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
