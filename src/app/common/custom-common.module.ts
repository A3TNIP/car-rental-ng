import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TopnavComponent} from "./components/topnav/topnav.component";
import {SidenavComponent} from "./components/sidenav/sidenav.component";
import {LoaderComponent} from "./components/loader/loader.component";
import { RedirectComponent } from './redirect/redirect.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import {FileUploadModule} from "primeng/fileupload";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    TopnavComponent,
    SidenavComponent,
    LoaderComponent,
    RedirectComponent,
    NotFoundComponent,
    DocumentUploadComponent
  ],
  exports: [
    SidenavComponent,
    TopnavComponent,
    LoaderComponent,
    DocumentUploadComponent
  ],
  imports: [
    CommonModule,
    ProgressSpinnerModule,
    RouterLink,
    RouterLinkActive,
    DialogModule,
    RadioButtonModule,
    FormsModule,
    FileUploadModule,
    CalendarModule
  ]
})
export class CustomCommonModule { }
