import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {LoaderService} from './common/service/loader.service';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'car-rental-ng';
  loader = LoaderService.get();

  noNavRoutes = [
    "/login",
    "/register",
    "/redirect",
  ]
  noNav: boolean = false;


  constructor(private primeNgConfig: PrimeNGConfig, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe({
      next: (next) => {
        this.noNav = this.noNavRoutes.includes((next as NavigationStart).url);
      }
    })
    this.primeNgConfig.ripple = true;
    this.primeNgConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100,
    }
    this.router.navigateByUrl("/home").then();
  }
}
