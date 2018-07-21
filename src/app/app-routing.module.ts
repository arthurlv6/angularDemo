import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login.component';
import { UnfinishedComponent } from './unfinished.component';
import { AuthGuard } from './Shared/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },

  {
    path: 'settings',
    canActivate: [AuthGuard],
    component: UnfinishedComponent
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
  { path: 'unfinished', component: UnfinishedComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
