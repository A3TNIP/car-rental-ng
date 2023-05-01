import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../common/service/base.service";
import {ApiConstants} from "../../common/constants/ApiConstants";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  public response!: any;

  public rentalId: string = "8bb86a26-44f8-4140-9b92-bc5a6920d10b";
  public rentalObj!: any;
  public rentDays!: number;
  public carObj!: any;
  billingVisible: boolean = false;
  showPayment: boolean = false;
  paymentStep: "PIN" | "OTP" = "PIN";

  public paymentInitiationForm!: FormGroup;
  paymentOtpForm!: FormGroup;
  constructor(private service: BaseService, private fb: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getBillingInfo();
    this.paymentInitiationForm = this.fb.group({
      mobile: ['', Validators.required],
      transactionPin: ['', Validators.required],
      amount: [0, Validators.required],
      productIdentity: ['', Validators.required],
      productName: ['', Validators.required],
    })
    this.paymentOtpForm = this.fb.group({
      token: ['', Validators.required],
      confirmationCode: ['', Validators.required],
      transactionPin: ['', Validators.required],
    })
  }

  public getBillingInfo() {
    console.log(`${ApiConstants.BILL_CONTROLLER}${ApiConstants.RENT}/${this.rentalId}`);
    this.service.getRequest(`${ApiConstants.BILL_CONTROLLER}${ApiConstants.RENT}/${this.rentalId}`)
      .subscribe({
        next: (resp) => {
          this.response = resp.data;
          this.paymentInitiationForm.patchValue({
            amount: this.response.totalAmount,
            productIdentity: this.response.billId,
            productName: `Bill for rent - ${this.response.rentalId}`,
          })
          console.log(this.paymentInitiationForm.getRawValue())
          this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}/${resp.data.rentalId}`)
            .subscribe({
              next: (resp) => {
                this.rentalObj = resp.data;
                this.rentDays = Math.ceil((new Date(this.rentalObj.endDate).getTime() - new Date(this.rentalObj.startDate).getTime()) / (1000 * 3600 * 24));
                this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}/${resp.data.carId}`)
                  .subscribe({
                    next: (resp) => {
                      this.carObj = resp.data;
                      console.log(resp.data)
                    }
                  })
                console.log(resp.data);
              }
            })
          console.log(resp.data);
        },
        error: error => {
          this.service.showToast("Error", "error", error.message)
        }
      })
  }


  showbillingPopup() {
    this.billingVisible = true;
  }

  hidebillingPopup() {
    this.billingVisible = false;
  }

  public confirmPayment() {
    this.service.postRequest(this.paymentOtpForm.getRawValue(), `${ApiConstants.KHALTI_CONTROLLER}/ConfirmTransaction`)
      .subscribe({
        next: (resp) => {
          console.log(resp.data);
          this.service.showToast("Success", "warn", "Payment has been scheduled");
          this.showPayment = false;
          this.hidebillingPopup();
          this.savePayment();
        },
        error: error => {
          this.service.showToast("Error", "error", error.message)
        }
      })
  }

  private savePayment() {
    const payload = {
      billId: this.response.billId,
      paymentMode: "KHALTI",
      paidAmount: this.response.totalAmount,
      customerId: this.rentalObj.requestedBy
    }
    this.service.postRequest(payload, `${ApiConstants.PAYMENT_CONTROLLER}`)
      .subscribe({
        next: (resp) => {
          console.log(resp.data);
          this.service.showToast("Success", "success", "Payment has been saved successfully");
        }
      })
  }

  initiatePayment() {
    // Multiply the amount by 100 to convert to paisa
    this.service.postRequest(this.paymentInitiationForm.getRawValue(), `${ApiConstants.KHALTI_CONTROLLER}/initiate-transaction`)
      .subscribe({
        next: (resp) => {
          console.log(resp.data.token);
          this.paymentOtpForm.patchValue({
            token: resp.data.token,
            transactionPin: this.paymentInitiationForm.get('transactionPin')!.value
          });
          this.paymentStep = "OTP";
        }
      })
  }
}
