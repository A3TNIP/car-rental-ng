import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent {
  offerVisible: boolean = false;

  configurationData: any;
  public offerForm!: FormGroup;
  formBuilder: any;
  carList: any;
  isUpdate: boolean = false;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }
  ngOnInit():void{
    this.fetchCars();
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
  private fetchCars() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}`).subscribe({
      next: (res: any) => {
        this.carList = res.dataList;
        console.log(this.carList);
        LoaderService.hide();
      },
      error: (err: any) => {
        console.error('Failed to get cars', err);
      },
    });
  }

  public deleteCar(car: any) {
    console.log('url', `${ApiConstants.CONFIG_CONTROLLER}/${car.id}`);
    LoaderService.show();
    this.service.deleteRequest(`${ApiConstants.CARS_CONTROLLER}/${car.id}`).subscribe({
      next: (res: any) => {
        if (res.message == 'Car deleted successfully') {
          this.service.showToast('Deleted successfully');
          this.fetchCars();
        }
        LoaderService.hide();
      },
      error: (err: any) => {
        console.error('Failed to delete car', err);
        LoaderService.hide();
      },
    });
  }


  public addCar(car: any) {
    LoaderService.show();
    delete car.id; // remove id field from config object
    this.service.postRequest(car,`${ApiConstants.CARS_CONTROLLER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        if (res.isSuccess) {
          console.log('Car added successfully');
          this.service.showToast('Success', 'success', 'Configuration added successfully');
          this.offerForm.reset();
          this.fetchCars();
        }
      },
      error: (err: any) => {
        console.error('Failed to add configuration', err);
        LoaderService.hide();
      },
    });
  }


  public updateCar(config: any) {
    LoaderService.show();
    console.log(config);
    const updatedconfig = {
      ...config,
      key: this.offerForm.get('key')!.value,
      value: this.offerForm.get('value')!.value,
      code: this.offerForm.get('code')!.value
    };
    this.service.putRequest(updatedconfig,`${ApiConstants.CONFIG_CONTROLLER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        if (res && res.isSuccess) {
          console.log('Configuration updated successfully');
          this.isUpdate = false;
          this.offerForm.reset();
          this.fetchCars();
          this.service.showToast('Success', 'success', 'Configuration updated successfully');
        }
      },
      error: (err: any) => {
        console.error('Failed to update configuration', err);
        LoaderService.hide();
      },
    });
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

  public resetForm(){
    this.offerForm.reset()
    this.isUpdate = false;
  }

  showofferPopup() {
    this.offerVisible = true;
  }

  hideofferPopup() {
    this.offerVisible = false;
  }
}
