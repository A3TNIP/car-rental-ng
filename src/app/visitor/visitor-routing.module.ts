import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VisitorComponent} from "./visitor.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {LoginGuard} from "../common/guards/login.guard";

const routes: Routes = [
  {
    path: '', component: VisitorComponent, children: [
      {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
      {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorRoutingModule {
}
