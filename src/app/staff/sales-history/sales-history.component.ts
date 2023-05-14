import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {
  filterForm!: FormGroup;
  salesList!:any;
  constructor(private service:BaseService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      userName: ['', Validators.required],
      authorizedBy: ['', Validators.required],
      startDate: [null],
      endDate: [null]
    });
    this.getSales();
  }

  getSales() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.BILL_CONTROLLER}${ApiConstants.SALES}`).subscribe({
      next: (res: any) => {
        this.salesList = res.dataList;
        console.log(this.salesList);
        LoaderService.hide();
      },
      error: (err: any) => {
        console.error('Failed to get offers', err);
      },
    });
  }

  reset(){
    this.filterForm.reset();
    this.getSales();
  }
  filter(){
    // TODO make post request to filter the sales using the requestedBy , approvedBy , startDate , endDate
    const payload = this.filterForm.getRawValue();    
    this.service.postRequest(payload,`${ApiConstants.BILL_CONTROLLER}${ApiConstants.SALES_FILTERED_LIST}`).subscribe({
      next: (res: any) => {
        this.salesList = res.dataList;
        console.log(this.salesList);
      },
      error: (err: any) => {
        console.error('Failed to get offers', err);
      },
    })
  }
}
