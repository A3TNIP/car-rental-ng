import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {StaffComponent} from './staff/staff.component';
import {AdminListComponent} from './admin-list/admin-list.component';
import {AdminComponent} from './admin.component';
import {CustomCommonModule} from "../common/custom-common.module";
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationService } from '../common/service/configuration.service';


@NgModule({
  declarations: [
    StaffComponent,
    AdminListComponent,
    AdminComponent,
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CustomCommonModule
  ],
  providers: [ConfigurationService],
})
export class AdminModule { }
