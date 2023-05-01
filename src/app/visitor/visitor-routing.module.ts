import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VisitorComponent} from "./visitor.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LoginGuard} from "../common/guards/login.guard";
import {LandingComponent} from "./landing/landing.component";
import {ViewcarsComponent} from "./viewcars/viewcars.component";

const routes: Routes = [
  {
    path: '', component: VisitorComponent, children: [
      {path: "home", component: LandingComponent, canActivate: [LoginGuard]},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
      {path: 'available', component: ViewcarsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule {
}
