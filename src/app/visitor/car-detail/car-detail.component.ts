import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.getCar();
  }

  private getCar() {
    const car = localStorage.getItem("viewingCar")!;
    console.log(JSON.parse(car));
  }
}
