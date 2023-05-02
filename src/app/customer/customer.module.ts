import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerLandingComponent } from './customer-landing/customer-landing.component';
import { CustomCommonModule } from "../common/custom-common.module";
import { ReturnComponent } from './return/return.component';
import { HistoryComponent } from './history/history.component';
import {DialogModule} from "primeng/dialog";
import { ProfileComponent } from './profile/profile.component';
import { DamagesComponent } from './damages/damages.component';


@NgModule({
    declarations: [
        CustomerComponent,
        CustomerLandingComponent,
        ReturnComponent,
        HistoryComponent,
        ProfileComponent,
        DamagesComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        CustomCommonModule,
        DialogModule
    ]
})
export class CustomerModule { }
