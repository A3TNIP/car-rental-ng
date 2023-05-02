import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";
import {BaseService} from "../../common/service/base.service";
import {ApiConstants} from "../../common/constants/ApiConstants";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  rentCarVisible: boolean = false;
  public user!: any;
  public car!: any;
  public disabledDates!: any[];
  totalDays!: number;
  startDate: Date = new Date()
  endDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));
  totalCost: number = 0;
  constructor(private service: BaseService, private router: Router) {

  }

  ngOnInit(): void {
    this.getCar();
    this.user = JSON.parse(localStorage.getItem("currentUser")!);
    // difference of days between startDate and endDate
    this.calculateDifference();
  }

  private getCar() {
    this.car = JSON.parse(localStorage.getItem("viewingCar")!);
    this.disabledDates = this.car.rentedDates.map((x: string) => new Date(x));
    console.log(this.car)
  }

  showrentcarPopup() {
    this.rentCarVisible = true;
  }

  hiderentcarPopup() {
    this.rentCarVisible = false;
  }

  calculateDifference() {
    this.totalDays = Math.floor((Date.UTC(this.endDate.getFullYear(), this.endDate.getMonth(), this.endDate.getDate()) -
      Date.UTC(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate())) / (1000 * 60 * 60 * 24));
    if (this.totalDays <= 0){
      this.endDate = new Date(new Date().setDate(this.startDate.getDate() + 1));
      this.calculateDifference();
    }
    this.totalCost = this.totalDays * this.car.discountedRate;
  }

  submitRentRequest() {
    const payload: any = {
      carId: this.car.carId,
      startDate: this.startDate,
      endDate: this.endDate,
    }
    if (this.car.offerId) payload["offerId"] = this.car.offerId;
    this.service.postRequest(payload, `${ApiConstants.RENTAL_CONTROLLER}${ApiConstants.REQUEST}`)
      .subscribe({
        next: (response: any) => {
          this.service.showToast("Success", "success", "Rent request sent successfully");
          this.hiderentcarPopup();
          this.router.navigateByUrl("/home").then();
        }
      })
  }

  protected readonly Date = Date;
}
