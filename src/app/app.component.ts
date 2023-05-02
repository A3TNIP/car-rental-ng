import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {LoaderService} from './common/service/loader.service';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";
import {AuthenticationService} from "./common/service/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'car-rental-ng';
  loader = LoaderService.get();
  public is!: any;



  constructor(private primeNgConfig: PrimeNGConfig, private router: Router, private service: AuthenticationService) {
  }

  ngOnInit(): void {
    this.primeNgConfig.ripple = true;
    this.primeNgConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    }
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
}
