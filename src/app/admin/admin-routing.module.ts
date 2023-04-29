import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { StaffComponent } from './staff/staff.component';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminListComponent } from './admin-list/admin-list.component';
import {DashboardComponent} from "../staff/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      {path: "", redirectTo: "dashboard", pathMatch: "full"},
      {path: "staffs", component: StaffComponent, canActivate: [AuthGuard], data: {roles: ['Admin']}},
      {path: "admins", component: AdminListComponent, canActivate: [AuthGuard], data: {roles: ['Admin']}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
