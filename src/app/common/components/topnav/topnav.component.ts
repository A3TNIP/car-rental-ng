import { Component } from '@angular/core';
import {BaseComponent} from "../../../base/base.component";
import {AuthenticationService} from "../../service/authentication.service";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent extends BaseComponent{

  constructor(public override service: AuthenticationService) {
    super(service);
  }
}
