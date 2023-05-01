import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CustomerLandingComponent } from './customer-landing/customer-landing.component';
import { CustomCommonModule } from "../common/custom-common.module";
import { ReturnComponent } from './return/return.component';


@NgModule({
    declarations: [
        CustomerComponent,
        CustomerLandingComponent,
        ReturnComponent
    ],
    imports: [
        CommonModule,
        CustomerRoutingModule,
        CustomCommonModule
    ]
})
export class CustomerModule { }
