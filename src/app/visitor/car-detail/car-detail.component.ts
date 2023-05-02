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
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getCar();
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
}
