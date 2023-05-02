import {Component, OnInit} from '@angular/core';
import {BaseService} from "../../common/service/base.service";
import {ApiConstants} from "../../common/constants/ApiConstants";
import {LoaderService} from "../../common/service/loader.service";

@Component({
  selector: 'app-viewcars',
  templateUrl: './viewcars.component.html',
  styleUrls: ['./viewcars.component.css']
})
export class ViewcarsComponent implements OnInit{
  public availableCars!:any;
  constructor(private service:BaseService) {
  }

  ngOnInit():void {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.AFTER_DISCOUNT}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        this.availableCars = res.dataList;
      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });
  }
}
