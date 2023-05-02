import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  userDto!: any;
  rentalHistory: any[] = [];
  totalRentalsMade: number = 0;
  rentedCars: any[] = [];

  constructor(private service:BaseService) {
  }

  ngOnInit(): void {
    //GET USER DTO
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.GET_DTO}`).subscribe({
      next: (res: any) => {
        this.userDto = res.data;
      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });

    LoaderService.show();
    //GET RENTAL BY USER ID from User Dto
    this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}${ApiConstants.USER}`,this.userDto).subscribe({
      next: (res: any) => {
        this.rentalHistory = res.dataList;
        this.totalRentalsMade = this.rentalHistory.length;
        for (let i = 0; i < this.rentalHistory.length; i++) {
          const rental = this.rentalHistory[i];
          // make API call to fetch each car detail
          this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}/${rental.carId}`).subscribe((car) => {
            rental.car = car.data;
            this.rentedCars.push(rental);
          });
        LoaderService.hide();
        }
      },
        error: (err: any) => {
        console.error(err);
        },
      });
  }
}
