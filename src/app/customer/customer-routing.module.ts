import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerComponent} from "./customer.component";
import {CustomerLandingComponent} from "./customer-landing/customer-landing.component";
import {AuthGuard} from "../common/guards/auth.guard";

const routes: Routes = [
  {
    path: 'customer', component: CustomerComponent, children: [
      {path: 'profile', component: CustomerLandingComponent, canActivate: [AuthGuard], data: {roles: ['Customer']}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
