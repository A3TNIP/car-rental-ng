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
  }

  viewCar(car: any) {
    localStorage.setItem('viewingCar', JSON.stringify(car));
    this.router.navigateByUrl('/car').then();
  }
}
