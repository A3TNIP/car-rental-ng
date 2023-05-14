import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "../../common/service/base.service";
import {ApiConstants} from "../../common/constants/ApiConstants";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  public response!: any;
  public billPaid: boolean = false;

  public rentalId!: string;
  public rentalObj!: any;
  public rentDays!: number;
  public carObj!: any;
  public hasDamages: boolean = false;
  billingVisible: boolean = false;
  showPayment: boolean = false;
  paymentStep: "PIN" | "OTP" = "PIN";

  public paymentInitiationForm!: FormGroup;
  public paymentOtpForm!: FormGroup;
  public damagesForm!: FormGroup;
  damageVisible: boolean = false;
  constructor(private service: BaseService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.getLatestRental();
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

    this.damagesForm = this.fb.group({
      tires: new FormControl(false),
      mirrors: new FormControl(false),
      windscreen: new FormControl(false),
      hood: new FormControl(false),
      trunk: new FormControl(false),
      engine: new FormControl(false),
      seats: new FormControl(false),
      others: new FormControl(false),
      othersDetail: [''],
      description: ['', Validators.required],
    });
  }

  private getLatestRental() {
    this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}/Latest`)
      .subscribe({
        next: (resp) => {
          if (resp.data) {
            this.rentalId = resp.data.id;
            this.getBillingInfo();
          }
          else this.service.showToast("Warning", "warn", "No rental found");
          console.log(resp.data);
        }
      })
  }

  public getBillingInfo() {
    console.log(`${ApiConstants.BILL_CONTROLLER}${ApiConstants.RENT}/${this.rentalId}`);
    this.service.getRequest(`${ApiConstants.DAMAGE_CONTROLLER}/Rent/${this.rentalId}`)
      .subscribe({
        next: (resp) => {
          this.hasDamages = !resp.isSuccess;
          console.log(resp.isSuccess)
        }
      })
    this.service.getRequest(`${ApiConstants.BILL_CONTROLLER}${ApiConstants.RENT}/${this.rentalId}`, true)
      .subscribe({
        next: (resp) => {
          this.response = resp.data;
          if (resp.message) this.billPaid = true;
          this.paymentInitiationForm.patchValue({
            amount: this.response.totalAmount,
            productIdentity: this.response.billId,
            productName: `Bill for rent - ${this.response.rentalId}`,
          })
          console.log(this.paymentInitiationForm.getRawValue())
          console.log(resp.data);
        },
      })
    this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}/${this.rentalId}`)
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
      paymentMethod: "KHALTI",
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

  showdamagePopup() {
    this.damageVisible = true;
  }

  hidedamagePopup() {
    this.damageVisible = false;
  }

  cancelRequest() {
    const payload = {
      ...this.rentalObj,
      status: "Cancelled"
    }
    this.service.postRequest(payload,`${ApiConstants.RENTAL_CONTROLLER}/ChangeStatus`)
      .subscribe({
        next: (resp) => {
          console.log(resp.data);
          this.service.showToast("Success", "success", "Request has been cancelled successfully");
          this.router.navigateByUrl("/home").then();
        }
      })
  }

  public submitDamageRequest() {
    let payload: any = {};
    const form = this.damagesForm.getRawValue();
    payload["rentalId"] = this.rentalId;
    payload["date"] = new Date();
    payload["description"] = this.damagesForm.get('description')!.value;
    delete form["description"];
    let damagedParts = [];
    for (const formKey in form) {
      if (form[formKey]) {
        damagedParts.push(formKey);
      }
    }
    payload["damagedParts"] = damagedParts.join(",");
    console.log(payload);
    this.service.postRequest(payload, `${ApiConstants.DAMAGE_CONTROLLER}`)
      .subscribe({
        next: (resp) => {
          console.log(resp.data);
          this.service.showToast("Success", "success", "Damage request has been submitted successfully");
          this.hidedamagePopup();
        }
      })
  }

}
