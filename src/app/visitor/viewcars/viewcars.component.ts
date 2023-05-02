import {Component, OnInit} from '@angular/core';
import {BaseService} from "../../common/service/base.service";
import {ApiConstants} from "../../common/constants/ApiConstants";
import {LoaderService} from "../../common/service/loader.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-viewcars',
  templateUrl: './viewcars.component.html',
  styleUrls: ['./viewcars.component.css']
})
export class ViewcarsComponent implements OnInit{
  public availableCars!:any;
  constructor(private service:BaseService, private router: Router) {
  }

  ngOnInit():void {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}/AfterDiscount`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        this.availableCars = res.dataList;
        console.log(res.dataList)
      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });
    // this.availableCars = [  {    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "available",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },
    //   {    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "available",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },
    //   {    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "unavailable",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },
    //   {    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "unavailable",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },
    //   {    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "available",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },
    //   {    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "available",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },{    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "available",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },
    //   {    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "available",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },{    "carId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "model": "Camry",    "make": "Toyota",    "color": "Red",    "licensePlate": "ABC-123",    "buildYear": 2022,    "brand": "Toyota",    "rate": 80,    "discountedRate": 70,    "discountModifier": 0.1,    "offerId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",    "status": "available",    "createdOn": "2023-05-01T23:46:59.643Z",    "imageUrl": null  },
    //
    // ]

  }

  viewCar(car: any) {
    localStorage.setItem('viewingCar', JSON.stringify(car));
    this.router.navigateByUrl('/car').then();
  }
}
