import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VisitorRoutingModule} from './visitor-routing.module';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {LandingComponent} from './landing/landing.component';
import {VisitorComponent} from './visitor.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CustomCommonModule } from "../common/custom-common.module";


@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        LandingComponent,
        VisitorComponent
    ],
    imports: [
        CommonModule,
        VisitorRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        CustomCommonModule
    ]
})
export class VisitorModule { }
