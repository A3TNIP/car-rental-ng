import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent {
  offerVisible: boolean = false;

  configurationData: any;
  public offerForm!: FormGroup;
  formBuilder: any;
  billList: any;
  isUpdate: boolean = false;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }
  ngOnInit():void{
    this.fetchBills();
    this.offerForm = this.fb.group({
      id: [""],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      buildYear: ['', Validators.required],
      status: ['', Validators.required],
      licensePlate: ['', Validators.required],
      rate: ['', Validators.required],
    });
  }
  private fetchBills() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.BILL_CONTROLLER}`).subscribe({
      next: (res: any) => {
        this.billList = res.dataList;
        console.log(res);
        LoaderService.hide();
      },
      error: (err: any) => {
        console.error('Failed to get cars', err);
      },
    });
  }

  public approveBill(bill: any) {
    console.log('yo bill garna parne approve', bill)
    this.service.postRequest(bill,`${ApiConstants.PAYMENT_CONTROLLER}`)
      .subscribe({
        next: (res: any) => {
          this.fetchBills();
        }
      })
  }

  public populateForm(car: any) {
    this.offerForm.setValue({
      id:car.id,
      brand: car.brand,
      buildYear: car.buildYear,
      model: car.model,
      rate: car.rate,
      color: car.color,
      status: car.status,
      licensePlate: car.licensePlate,
    });
    this.isUpdate = true;
  }
}
