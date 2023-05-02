import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from "./customer.component";
import {CustomerLandingComponent} from "./customer-landing/customer-landing.component";
import {AuthGuard} from "../common/guards/auth.guard";
import {ReturnComponent} from "./return/return.component";
import {HistoryComponent} from "./history/history.component";
import {ProfileComponent} from "./profile/profile.component";
import {DamagesComponent} from "./damages/damages.component";

const routes: Routes = [
  {
    path: 'customer', component: CustomerComponent, children: [
      {path: 'home', component: CustomerLandingComponent, canActivate: [AuthGuard], data: {roles: ['Customer']}},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'return', component: ReturnComponent, canActivate: [AuthGuard], data: {roles: ['Customer']}},
      {path: 'history', component: HistoryComponent, canActivate: [AuthGuard], data: {roles: ['Customer']}},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {roles: ['Customer']}},
      {path: 'damages', component: DamagesComponent, canActivate: [AuthGuard], data: {roles: ['Customer']}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
