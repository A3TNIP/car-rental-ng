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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { PaymentsComponent } from './payments/payments.component';
import {ChartModule} from "primeng/chart";
import { OffersComponent } from './offers/offers.component';
import {CalendarModule} from "primeng/calendar";
import {MultiSelectModule} from "primeng/multiselect";
import { DropdownModule } from 'primeng/dropdown';
import { SalesHistoryComponent } from './sales-history/sales-history.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CarListComponent,
    ClientListComponent,
    BillingListComponent,
    RentalListComponent,
    DamagesComponent,
    StaffComponent,
    PaymentsComponent,
    OffersComponent,
    SalesHistoryComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    CustomCommonModule,
    TableModule,
    DialogModule,
    ReactiveFormsModule,
    ChartModule,
    CalendarModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule
  ]
})
export class StaffModule { }
