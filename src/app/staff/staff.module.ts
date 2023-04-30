import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CarListComponent } from './car-list/car-list.component';
import { ClientListComponent } from './client-list/client-list.component';
import { BillingListComponent } from './billing-list/billing-list.component';
import { RentalListComponent } from './rental-list/rental-list.component';
import { DamagesComponent } from './damages/damages.component';
import { StaffComponent } from './staff.component';
import {CustomCommonModule} from "../common/custom-common.module";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DashboardComponent,
    CarListComponent,
    ClientListComponent,
    BillingListComponent,
    RentalListComponent,
    DamagesComponent,
    StaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    CustomCommonModule,
    TableModule,
    DialogModule,
    ReactiveFormsModule
  ]
})
export class StaffModule { }
