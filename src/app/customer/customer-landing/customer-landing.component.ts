import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-landing',
  templateUrl: './customer-landing.component.html',
  styleUrls: ['./customer-landing.component.css']
})
export class CustomerLandingComponent implements OnInit {
  public mostRentedCar!: any;
  public offers!:any;
  constructor(private service: BaseService, private router: Router) {
  }

  ngOnInit(): void {
    this.getMostRentedCar();
    this.getOffer();
  }

  private getOffer(){
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.OFFERS_CONTROLLER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        this.offers = res.dataList.sort((a: any, b: any) => a.endDate - b.endDate).splice(0, 2);
        console.log(this.offers);

      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });
  }

  private getMostRentedCar() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.GET_MOST_RENTED_CAR}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        this.mostRentedCar = res.data;
        console.log(this.mostRentedCar);
      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });
  }

  viewCar() {
    localStorage.setItem('viewingCar', JSON.stringify(this.mostRentedCar));
    this.router.navigateByUrl('/car').then();
  }
}
