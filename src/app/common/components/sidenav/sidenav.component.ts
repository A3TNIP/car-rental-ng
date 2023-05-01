import {Component, OnInit} from '@angular/core';
import { BaseComponent } from 'src/app/base/base.component';
import { AuthenticationService } from '../../service/authentication.service';
import {filter} from "rxjs";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent extends BaseComponent implements OnInit{

  constructor(public override service: AuthenticationService, private router: Router) {
    super(service);
  }

  /**
   * This is a hack to reload the role booleans after the route changes
   * This is to ensure that the nav bar is updated
   */
  private onActivate() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe({
      next: (next) => {
        this.is = this.service.getRoleBoolean();
      }
    })
  }

  ngOnInit(): void {
    this.onActivate();
  }

}
