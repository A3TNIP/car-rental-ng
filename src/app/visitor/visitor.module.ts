import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VisitorRoutingModule} from './visitor-routing.module';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {VisitorComponent} from './visitor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomCommonModule } from "../common/custom-common.module";
import { ViewcarsComponent } from './viewcars/viewcars.component';
import { CarDetailComponent } from './car-detail/car-detail.component';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        LandingComponent,
        VisitorComponent,
        ViewcarsComponent,
        CarDetailComponent
    ],
    imports: [
        CommonModule,
        VisitorRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CustomCommonModule,
        DialogModule,
        CalendarModule,
    ]
})
export class VisitorModule { }
