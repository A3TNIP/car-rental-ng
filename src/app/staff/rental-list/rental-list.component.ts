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
            this.configurationData = res.dataList.filter((rent: any) => rent.status != 'Cancelled'
              && rent.status != 'Completed'
              && rent.status != 'Rejected'); //filtering out the cancelled and completed rentals
          }
        }
      });
  }
  generateBill(config:any) {
    LoaderService.show();
    const payload = {
      RentalId: config.id
    }
    this.service.postRequest(payload,`${ApiConstants.BILL_CONTROLLER}${ApiConstants.GENERATE}`)
      .subscribe({
        next: (res: any) => {
          LoaderService.hide();
          this.fetchRentalList();
          if (res.message == 'Bill already exists') {
            this.service.showToast('Bill already exists');
          }
          else{
            this.service.showToast('Bill Generated');
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

  changeStatus(event: any, rent: any) {
    const payload = {
      ...rent,
      status: event.value
    }

    this.service.postRequest(payload, `${ApiConstants.RENTAL_CONTROLLER}/ChangeStatus`)
      .subscribe({
        next: () => {
          this.service.showToast('Status Updated');
          if (event.value == 'Completed') {
            this.generateBill(rent);
          }
        }
      })
  }
}
