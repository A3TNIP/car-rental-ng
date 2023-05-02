import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StaffComponent } from './staff/staff.component';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminListComponent } from './admin-list/admin-list.component';
import {DashboardComponent} from "../staff/dashboard/dashboard.component";
import { ConfigurationComponent } from './configuration/configuration.component';
import {ProfileComponent} from "../user/profile/profile.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {path: "staffs", component: StaffComponent, canActivate: [AuthGuard], data: {roles: ['Admin']}},
      {path: "admins", component: AdminListComponent, canActivate: [AuthGuard], data: {roles: ['Admin']}},
      {path: "config", component: ConfigurationComponent,canActivate: [AuthGuard], data: {roles: ['Admin']}},
      {path: "profile", component: ProfileComponent,canActivate: [AuthGuard], data: {roles: ['Admin','Staff']}},
      {path: "", redirectTo: "dashboard", pathMatch: "full"},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
