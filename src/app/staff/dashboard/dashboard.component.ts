import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiConstants} from 'src/app/common/constants/ApiConstants';
import {BaseService} from 'src/app/common/service/base.service';
import {LoaderService} from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public products: any[] = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'nvklal433',
      name: 'Black Watch',
      description: 'Product Description',
      image: 'black-watch.jpg',
      price: 72,
      category: 'Accessories',
      quantity: 61,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1002',
      code: 'zz21cz3c1',
      name: 'Blue Band',
      description: 'Product Description',
      image: 'blue-band.jpg',
      price: 79,
      category: 'Fitness',
      quantity: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1003',
      code: '244wgerg2',
      name: 'Blue T-Shirt',
      description: 'Product Description',
      image: 'blue-t-shirt.jpg',
      price: 29,
      category: 'Clothing',
      quantity: 25,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1004',
      code: 'h456wer53',
      name: 'Bracelet',
      description: 'Product Description',
      image: 'bracelet.jpg',
      price: 15,
      category: 'Accessories',
      quantity: 73,
      inventoryStatus: 'INSTOCK',
      rating: 4
    },
    {
      id: '1005',
      code: 'av2231fwg',
      name: 'Brown Purse',
      description: 'Product Description',
      image: 'brown-purse.jpg',
      price: 120,
      category: 'Accessories',
      quantity: 0,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 4
    },
    {
      id: '1006',
      code: 'bib36pfvm',
      name: 'Chakra Bracelet',
      description: 'Product Description',
      image: 'chakra-bracelet.jpg',
      price: 32,
      category: 'Accessories',
      quantity: 5,
      inventoryStatus: 'LOWSTOCK',
      rating: 3
    },
    {
      id: '1007',
      code: 'mbvjkgip5',
      name: 'Galaxy Earrings',
      description: 'Product Description',
      image: 'galaxy-earrings.jpg',
      price: 34,
      category: 'Accessories',
      quantity: 23,
      inventoryStatus: 'INSTOCK',
      rating: 5
    }
  ]
  adminForm!: FormGroup;
  public staffForm!: FormGroup;
  public carForm!: FormGroup;
  staffVisible: boolean = false;
  adminVisible: boolean = false;
  carVisible: boolean = false;
  totalCarCount!: string;
  totalCarsOnRentCount!: string;
  totalStaffCount!: string;
  totalUserCount!: string;
  totalRegularUserCount!: string;
  totalRentCount!: string;
  totalDamageCount!: string;
  public chartOptions!: any;
  public data!: any;

  constructor(private formBuilder: FormBuilder, private service: BaseService) {
  }

  showstaffPopup() {
    this.staffVisible = true;
  }

  showadminPopup() {
    this.adminVisible = true;
  }

  showcarPopup() {
    this.carVisible = true;
  }

  ngOnInit(): void {
    LoaderService.show();
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1.5,
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


    this.service.getRequest(`${ApiConstants.PAYMENT_CONTROLLER}/PaymentsByDate`)
      .subscribe({
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


    //TOTAL CARS COUNT

    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.CAR_COUNT}`).subscribe({
      next: (res: any) => {
        this.totalCarCount = res.data;
      },
      error: (err: any) => {
        console.error(err);
      },
    });

    //TOTAL CARS ON RENT COUNT

    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.CARS_ON_RENT_COUNT}`).subscribe({
      next: (res: any) => {
        this.totalCarsOnRentCount = res.data;
      },
      error: (err: any) => {
        console.error(err);
      },
    });

    //TOTAL STAFF COUNT

    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.STAFF_COUNT}`).subscribe({
      next: (res: any) => {
        this.totalStaffCount = res.data;
      },
      error: (err: any) => {
        console.error(err);
      },
    });

    //Total User Count

    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.ALL_CUSTOMER_COUNT}`).subscribe({
      next: (res: any) => {
        this.totalUserCount = res.data;
      },
      error: (err: any) => {
        console.error('Failed to get total user count', err);
      },
    });

    //Total Active User Count

    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.REGULAR_CUSTOMER_COUNT}`).subscribe({
      next: (res: any) => {
        this.totalRegularUserCount = res.data;
      },
      error: (err: any) => {
        console.error('Failed to get total active count', err);
      },
    });


    //Total Rented Car Count

    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}${ApiConstants.CARS_ON_RENT_COUNT}`).subscribe({
      next: (res: any) => {
        this.totalCarsOnRentCount = res.data;
      },
      error: (err: any) => {
        console.error('Failed to get total rent car count', err);
      },
    });

    //Total Rented Car Count

    this.service.getRequest(`${ApiConstants.DAMAGE_CONTROLLER}${ApiConstants.DAMAGE_COUNT}`).subscribe({
      next: (res: any) => {
        this.totalDamageCount = res.data;
      },
      error: (err: any) => {
        console.error('Failed to get total rented car count', err);
      },
    });

    LoaderService.hide();
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
}
