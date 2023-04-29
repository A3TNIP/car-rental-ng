import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopnavComponent} from "./components/topnav/topnav.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {LoaderComponent} from "./components/loader/loader.component";
import { RedirectComponent } from './redirect/redirect.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    TopnavComponent,
    SidenavComponent,
    LoaderComponent,
    RedirectComponent,
    NotFoundComponent
  ],
  exports: [
    SidenavComponent,
    TopnavComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    RouterLink
  ]
})
export class CustomCommonModule { }
