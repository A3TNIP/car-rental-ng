import { HttpClient } from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';
import {DocumentUploadComponent} from "../../common/components/document-upload/document-upload.component";

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  configurationData: any;
  carVisible: boolean = false;
  public carForm!: FormGroup;
  carList: any;
  isUpdate: boolean = false;
  @ViewChild('uploadComponent') uploadComponent!: DocumentUploadComponent;
  showDocument: boolean = false;
  public carId: any;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }
  ngOnInit():void{
    this.fetchCars();
    this.carForm = this.fb.group({
      carId: [''],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      color: ['', Validators.required],
      buildYear: ['', Validators.required],
      status: ['Available', Validators.required],
      licensePlate: ['', Validators.required],
      rate: ['', Validators.required],
      make: ['', Validators.required],
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

  public updateCar(config: any) {
    LoaderService.show();
    console.log(config);
    const updatedconfig = {
      ...config,
      key: this.carForm.get('key')!.value,
      value: this.carForm.get('value')!.value,
      code: this.carForm.get('code')!.value
    };
    this.service.putRequest(updatedconfig,`${ApiConstants.CONFIG_CONTROLLER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        if (res && res.isSuccess) {
          console.log('Configuration updated successfully');
          this.isUpdate = false;
          this.carForm.reset();
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
    this.carForm.setValue({
      carId:car.carId,
      brand: car.brand,
      buildYear: car.buildYear,
      model: car.model,
      rate: car.rate,
      color: car.color,
      status: car.status,
      licensePlate: car.licensePlate,
      make: car.make,
    });
    this.isUpdate = true;
    this.showcarPopup();
  }

  public resetForm(){
    this.carForm.reset()
    this.isUpdate = false;
  }

  showcarPopup() {
    this.carVisible = true;
  }

  hidecarPopup() {
    this.carVisible = false;
  }

  public addCar(car: any) {
    LoaderService.show();
    const url = `${ApiConstants.CARS_CONTROLLER}`;
    if (this.isUpdate) {
      this.service.putRequest(car,`${ApiConstants.CARS_CONTROLLER}`).subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res.isSuccess) {
            console.log(res)
            this.carId = res.data.carId;
            this.hidecarPopup();
            this.service.showToast('Success', 'success', `Car updated successfully`);
            this.carForm.reset();
            this.fetchCars();
          }
        },
        error: (err: any) => {
          console.error('Failed to register admin', err);
          LoaderService.hide();
        },
      });
    } else {
      delete car.id;// remove id field from car object
      this.service.postRequest(car,`${ApiConstants.CARS_CONTROLLER}`).subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res.isSuccess) {
            console.log(res)
            this.carId = res.data.carId;
            this.showDocument = true;
            this.hidecarPopup();
            this.service.showToast('Success', 'success', 'Car registered successfully');
            this.carForm.reset();
            this.fetchCars();
          }
        },
        error: (err: any) => {
          console.error('Failed to register admin', err);
          LoaderService.hide();
        },
      });
    }

  }

  deleteCar(car: any) {
    LoaderService.show();
    this.service.deleteRequest(`${ApiConstants.CARS_CONTROLLER}/${car.carId}`).subscribe({
      next: (res: any) => {
        if (res.message == 'Deleted successfully') {
          this.service.showToast('Car removed successfully');
          this.fetchCars();
        }
        LoaderService.hide();
      },
      error: (err: any) => {
        console.error('Failed to remove car', err);
        LoaderService.hide();
      },
    });
  }
}
