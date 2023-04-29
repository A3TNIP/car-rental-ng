import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './user.component';
import { CustomCommonModule } from "../common/custom-common.module";


@NgModule({
    declarations: [
        ProfileComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        CustomCommonModule
    ]
})
export class UserModule { }
