import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends BaseComponent{

  constructor(public override service: AuthenticationService) {
    super(service);
  }

}
