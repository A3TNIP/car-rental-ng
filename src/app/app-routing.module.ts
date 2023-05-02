import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RedirectComponent} from "./common/redirect/redirect.component";
import {NotFoundComponent} from "./common/not-found/not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'redirect', pathMatch: 'full' },
  { path: '' , loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: '' , loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule) },
  { path: '' , loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  { path: '' , loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorModule) },
  { path: "redirect", component: RedirectComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
