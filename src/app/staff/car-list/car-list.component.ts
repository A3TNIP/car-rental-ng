import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent {
  configurationData: any;
  carVisible: boolean = false;
  public carForm!: FormGroup;
  formBuilder: any;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }
  
  private fetchConfigList() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.CONFIG_CONTROLLER}`)
      .subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res && res.dataList) {
            this.configurationData = res.dataList.map((config: any) => {
              return {
                id: config.id,
                key: config.key,
                value: config.value,
                code: config.code,
              }
            })
          }
        }
      });
  }

  ngOnInit(): void {
    this.carForm = this.formBuilder.group({
      Model: ['', Validators.required],
      Color: ['', Validators.required],
      License: ['', Validators.required],
      Rate: ['', Validators.required],
      Address: ['', Validators.required],
      Role: [2, Validators.required]
    })
  }

  showcarPopup() {
    this.carVisible = true;
  }

  hidecarPopup() {
    this.carVisible = false;
  }
}
