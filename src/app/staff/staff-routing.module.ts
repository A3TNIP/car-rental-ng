import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StaffComponent} from "./staff.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "../common/guards/auth.guard";
import {BillingListComponent} from "./billing-list/billing-list.component";
import {CarListComponent} from "./car-list/car-list.component";
import {DamagesComponent} from "./damages/damages.component";
import {RentalListComponent} from "./rental-list/rental-list.component";
import {ClientListComponent} from "./client-list/client-list.component";
import {OffersComponent} from "./offers/offers.component";

const routes: Routes = [
  {
    path: "", component: StaffComponent, children: [
      {path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], data: {roles: ["Staff", "Admin"]}},
      {path: "", redirectTo: "dashboard", pathMatch: "full"},
      {path: "bills", component: BillingListComponent, canActivate: [AuthGuard], data: {roles: ["Staff", "Admin"]}},
      {path: "cars", component: CarListComponent, canActivate: [AuthGuard], data: {roles: ["Staff", "Admin"]}},
      {path: "clients", component: ClientListComponent, canActivate: [AuthGuard], data: {roles: ["Staff", "Admin"]}},
      {path: "damages", component: DamagesComponent, canActivate: [AuthGuard], data: {roles: ["Staff", "Admin"]}},
      {path: "rentals", component: RentalListComponent, canActivate: [AuthGuard], data: {roles: ["Staff", "Admin"]}},
      {path: "offers", component: OffersComponent, canActivate: [AuthGuard], data: {roles: ["Staff", "Admin"]}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {
}
