import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user!:any;
  userDto: any;
  rentalHistory: any[] = [];
  totalRentalsMade: number = 0;
  rentedCars: any[] = [];

  constructor(private service:BaseService) {
  }

  ngOnInit(): void {
    
    //GET EMAIL 
    this.user = localStorage.getItem('currentUser')
    console.log('CurrentUser is,',this.user);
    
    //GET USER DTO
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.GET_DTO}`,this.user).subscribe({
      next: (res: any) => {
        this.userDto = res.data;
        console.log('user ko dto is,',this.userDto);
      },
      error: (err: any) => {
        console.error(err);
      },
    });

    //GET RENTAL BY USER ID
    this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}${ApiConstants.USER}`,this.userDto).subscribe({
      next: (res: any) => {
        this.rentalHistory = res.dataList;
        this.totalRentalsMade = this.rentalHistory.length;
        console.log('rental history is,',this.rentalHistory);
        console.log('number of rents made',this.totalRentalsMade);
      
        for (let i = 0; i < this.rentalHistory.length; i++) {
          const rental = this.rentalHistory[i];
          // make API call to fetch car details
          this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}/${rental.carId}`).subscribe((car) => {
            rental.car = car.data;
            this.rentedCars.push(rental);
          });
        }
        this.rentedCars = [
          {
            "id": "8bb86a26-44f8-4140-9b92-bc5a6920d10b",
            "requestedBy": "2a697c34-4a03-4a43-95f4-116b50bbf341",
            "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
            "approvedBy": "1ac4425e-ff3f-4108-b1f7-049cf333ab09",
            "startDate": "2023-05-02T05:42:22.038Z",
            "endDate": "2023-05-10T05:42:22.038Z",
            "status": "Completed",
            "offerId": null,
            "discount": 0,
            "totalPrice": 0,
            "car": {
              "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
              "model": "Corolla",
              "make": "Good",
              "color": "Blue",
              "licensePlate": null,
              "buildYear": 2004,
              "brand": "Toyota",
              "rate": 50,
              "discountedRate": 0,
              "discountModifier": 0,
              "offerId": null,
              "status": "Available",
              "createdOn": "2023-05-01T14:11:10.79943Z",
              "imageUrl": ""
            }
          },
          {
            "id": "8bb86a26-44f8-4140-9b92-bc5a6920d10b",
            "requestedBy": "2a697c34-4a03-4a43-95f4-116b50bbf341",
            "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
            "approvedBy": "1ac4425e-ff3f-4108-b1f7-049cf333ab09",
            "startDate": "2023-05-02T05:42:22.038Z",
            "endDate": "2023-05-10T05:42:22.038Z",
            "status": "Completed",
            "offerId": null,
            "discount": 0,
            "totalPrice": 0,
            "car": {
              "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
              "model": "Corolla",
              "make": "Good",
              "color": "Blue",
              "licensePlate": null,
              "buildYear": 2004,
              "brand": "Toyota",
              "rate": 50,
              "discountedRate": 0,
              "discountModifier": 0,
              "offerId": null,
              "status": "Available",
              "createdOn": "2023-05-01T14:11:10.79943Z",
              "imageUrl": ""
            }
          },
          {
            "id": "8bb86a26-44f8-4140-9b92-bc5a6920d10b",
            "requestedBy": "2a697c34-4a03-4a43-95f4-116b50bbf341",
            "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
            "approvedBy": "1ac4425e-ff3f-4108-b1f7-049cf333ab09",
            "startDate": "2023-05-02T05:42:22.038Z",
            "endDate": "2023-05-10T05:42:22.038Z",
            "status": "Completed",
            "offerId": null,
            "discount": 0,
            "totalPrice": 0,
            "car": {
              "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
              "model": "Corolla",
              "make": "Good",
              "color": "Blue",
              "licensePlate": null,
              "buildYear": 2004,
              "brand": "Toyota",
              "rate": 50,
              "discountedRate": 0,
              "discountModifier": 0,
              "offerId": null,
              "status": "Available",
              "createdOn": "2023-05-01T14:11:10.79943Z",
              "imageUrl": ""
            }
          },
          {
            "id": "8bb86a26-44f8-4140-9b92-bc5a6920d10b",
            "requestedBy": "2a697c34-4a03-4a43-95f4-116b50bbf341",
            "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
            "approvedBy": "1ac4425e-ff3f-4108-b1f7-049cf333ab09",
            "startDate": "2023-05-02T05:42:22.038Z",
            "endDate": "2023-05-10T05:42:22.038Z",
            "status": "Completed",
            "offerId": null,
            "discount": 0,
            "totalPrice": 0,
            "car": {
              "carId": "a9acbae4-df61-4252-9000-8b549ed90e32",
              "model": "Corolla",
              "make": "Good",
              "color": "Blue",
              "licensePlate": null,
              "buildYear": 2004,
              "brand": "Toyota",
              "rate": 50,
              "discountedRate": 0,
              "discountModifier": 0,
              "offerId": null,
              "status": "Available",
              "createdOn": "2023-05-01T14:11:10.79943Z",
              "imageUrl": ""
            }
          },
        ]
        console.log('rented cars were these:',this.rentedCars);
      },
        error: (err: any) => {
        console.error(err);
        },
      });
  }

  
}
