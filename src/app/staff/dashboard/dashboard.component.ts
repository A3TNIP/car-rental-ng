import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiConstants} from 'src/app/common/constants/ApiConstants';
import {BaseService} from 'src/app/common/service/base.service';
import {LoaderService} from 'src/app/common/service/loader.service';
import {BaseComponent} from "../../base/base.component";
import {forkJoin, Observable, tap} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  adminForm!: FormGroup;
  public staffForm!: FormGroup;
  public carForm!: FormGroup;
  public offerForm!: FormGroup;
  staffVisible: boolean = false;
  adminVisible: boolean = false;
  carVisible: boolean = false;
  totalCarCount!: string;
  totalCarsOnRentCount!: string;
  totalStaffCount!: string;
  totalUserCount!: string;
  totalRegularUserCount!:string;
  totalRentCount!:string;
  totalDamageCount!:string;
  mostRentedCar!:any;
  leastRentedCar!:any;
  customerList!:any;
  offerVisible: boolean = false;
  isUpdate: boolean = false;
  public loaded: boolean = false;
  constructor(private formBuilder: FormBuilder,public override service:BaseService) {
    super(service);
  }
  public chartOptions!: any;
  public data!: any;

  showstaffPopup() {
    this.staffVisible = true;
  }

  showadminPopup() {
    this.adminVisible = true;
  }

  showcarPopup() {
    this.carVisible = true;
  }

  showofferPopup() {
    this.offerVisible = true;
  }

  ngOnInit(): void {
    LoaderService.show();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.7,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder
          }
        }
      }
    };

    const req$: Observable<any>[] = [];


    req$.push(this.service.getRequest(`${ApiConstants.PAYMENT_CONTROLLER}/PaymentsByDate`)
      .pipe(
        tap({
          next: (res) => {
            const length = res.dataList.length;
            // subtract length no of days from today;
            const date = new Date();
            date.setDate(date.getDate() - length);

            const labels = [];
            for (let i = 0; i < length; i++) {
              labels.push(date.toDateString());
              date.setDate(date.getDate() + 1);
            }
            this.data = {
              labels: labels,
              datasets: [
                {
                  label: 'Payments',
                  data: res.dataList,
                  fill: false,
                  tension: 0.1,
                  borderColor: documentStyle.getPropertyValue('--blue-500')
                }
              ]
            }

          }
        })
      ));


    //TOTAL CARS COUNT
    req$.push(
    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.CAR_COUNT}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.totalCarCount = res.data;
          },
          error: (err: any) => {
            console.error(err);
          },
        }
      )));

    //TOTAL CARS ON RENT COUNT

    req$.push(this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.CARS_ON_RENT_COUNT}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.totalCarsOnRentCount = res.data;
          },
          error: (err: any) => {
            console.error(err);
          },
        }
      )));

    //TOTAL STAFF COUNT

    req$.push(
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.STAFF_COUNT}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.totalStaffCount = res.data;
          },
          error: (err: any) => {
            console.error(err);
          },
        })
      ));

    //Total User Count
    req$.push(
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.ALL_CUSTOMER_COUNT}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.totalUserCount = res.data;
          },
          error: (err: any) => {
            console.error('Failed to get total user count', err);
          },
        })
      ));

    //Total Active User Count

    req$.push(
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.REGULAR_CUSTOMER_COUNT}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.totalRegularUserCount = res.data;
          },
          error: (err: any) => {
            console.error('Failed to get total active count', err);
          },
        })
      ));


    //Total Rented Car Count

    req$.push(
    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.CARS_ON_RENT_COUNT}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.totalCarsOnRentCount = res.data;
          },
          error: (err: any) => {
            console.error('Failed to get total rent car count', err);
          },
        })
      ));

    //Total Rented Car Count

    req$.push(
    this.service.getRequest(`${ApiConstants.DAMAGE_CONTROLLER}${ApiConstants.DAMAGE_COUNT}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.totalDamageCount = res.data;
          },
          error: (err: any) => {
            console.error('Failed to get total rented car count', err);
          },
        })
      ));

    //Frequently Rented Car

    req$.push(
    this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}${ApiConstants.MOST_RENTED_CAR}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.mostRentedCar = res.data;
          },
          error: (err: any) => {
            console.error('Failed to get Frequently Rented Car', err);
          },
        })
      ));


    //Least Rented Car

    req$.push(this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}${ApiConstants.LEAST_RENTED_CAR}`)
      .pipe(
        tap(
          {
            next: (res: any) => {
              this.leastRentedCar = res.data;
            },
            error: (err: any) => {
              console.error('Failed to get Least Rented Car', err);
            },
          }
        )
      ));

    //GET customer list
    req$.push(this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.CUSTOMER}`)
      .pipe(
        tap({
          next: (res: any) => {
            this.customerList = res.dataList;
          },
          error: (err: any) => {
            console.error('Failed to get users', err);
          },
        })
      ));

    forkJoin(req$).subscribe({
      next: () => {
        LoaderService.hide();
        this.loaded = true;
      }
    })

    this.adminForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Name: ['', Validators.required],
      Role: [0, Validators.required]
    });

    this.staffForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Name: ['', Validators.required],
      Role: [1, Validators.required]
    })

    this.carForm = this.formBuilder.group({
      model: ['', Validators.required],
      make: ['', Validators.required],
      color: ['', Validators.required],
      buildYear: ['', Validators.required],
      brand: ['', Validators.required],
      rate: ['', Validators.required],
      licensePlate: ['', Validators.required],
      status: ['Available', Validators.required]
    })

    this.offerForm = this.formBuilder.group({
      id: [""],
      offerName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      discount: ['', Validators.required],
      type: ['', Validators.required],
      offerDescription: ['', Validators.required]
    });
  }

  hideadminPopup() {
    this.adminVisible = false;
  }

  hidestaffPopup() {
    this.staffVisible = false;
  }

  hidecarPopup() {
    this.carVisible = false;
  }

  hideofferPopup() {
    this.offerVisible = false;
  }

  public registerAdmin(){
    if (this.adminForm.invalid) return;
    if (this.adminForm.get('Password')?.value !== this.adminForm.get('ConfirmPassword')?.value) return;
    this.adminForm.value.ConfirmPassword;
    const payload = this.adminForm.getRawValue();
    this.service.postRequest(payload,`${ApiConstants.AUTHENTICATION_CONTROLLER}${ApiConstants.REGISTER}`).subscribe({
      next: (res: any) => {
        if (res.isSuccess){
          this.service.showToast('Admin Registered Successfully');
          this.adminForm.reset();
          this.adminVisible = false;
        }
      },
      error: (err: any) => {
        console.error('Failed to register admin', err);
      },
    });
  }

  public registerCar(){
    if (this.carForm.invalid) return;
    const payload = {
      ...this.carForm.getRawValue(),
      buildYear: +this.carForm.get('buildYear')!.value
    }
    this.service.postRequest(payload,`${ApiConstants.CARS_CONTROLLER}`).subscribe({
      next: (res: any) => {
        if (res.data){
          this.service.showToast('Car Added Successfully');
          this.carForm.reset();
          this.carVisible = false;
        }
      },
      error: (err: any) => {
        console.error('Failed to add car', err);
      },
    });
  }

  public registerStaff(){
    if (this.staffForm.invalid) return;
    if (this.staffForm.get('Password')?.value !== this.staffForm.get('ConfirmPassword')?.value) return;
    this.staffForm.value.ConfirmPassword;
    const payload = this.staffForm.getRawValue();
    this.service.postRequest(payload,`${ApiConstants.AUTHENTICATION_CONTROLLER}${ApiConstants.REGISTER}`).subscribe({
      next: (res: any) => {
        if (res.isSuccess){
          this.service.showToast('Staff Registered Successfully');
          this.staffForm.reset();
          this.staffVisible = false;
        }
      },
      error: (err: any) => {
        console.error('Failed to register staff', err);
      },
    });
  }

  doAction() {
    if (this.isUpdate) {

    } else {

    }
  }
}
