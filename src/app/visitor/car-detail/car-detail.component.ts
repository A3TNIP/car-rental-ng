import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  rentCarVisible: boolean = false;
  public car!: any;
  public disabledDates!: any[];
  totalDays!: number;
  startDate: Date = new Date()
  endDate: Date = new Date()
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getCar();
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
  }
}
