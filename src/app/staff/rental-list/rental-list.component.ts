import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiConstants} from 'src/app/common/constants/ApiConstants';
import {BaseService} from 'src/app/common/service/base.service';
import {LoaderService} from 'src/app/common/service/loader.service';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-rental-list',
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  configurationData: any;
  rentalStatus: any = ["Waiting", "Approved", "Rejected", "Cancelled", "Completed"];
  selectedStatus: any = {};
  config: any = {};

  constructor(private service: BaseService, private http: HttpClient, private fb: FormBuilder) {
  }

  private fetchRentalList() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}`)
      .subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res && res.dataList) {
            this.configurationData = res.dataList;
          }
        }
      });

  }

  ngOnInit() {
    this.fetchRentalList();
    this.rentalForm = this.fb.group({
      id: [''],
      status: [''],
      requestedBy: [''],
      carId: [''],
      approvedBy: [''],
      startDate: [''],
      endDate: [''],
      offerId: [''],
      discount: [''],
      totalPrice: ['']
    })
  }
  rentalForm!: FormGroup;
}
