import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../../base/base.component";
import {AuthenticationService} from "../../service/authentication.service";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent extends BaseComponent implements OnInit{

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
