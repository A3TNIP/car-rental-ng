import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-damages',
  templateUrl: './damages.component.html',
  styleUrls: ['./damages.component.css']
})
export class DamagesComponent {
  configurationData: any;
  addCostVisible: boolean = false;
  staffForm: any;
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
    this.staffForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      Phone: ['', Validators.required],
      Address: ['', Validators.required], 
      Name: ['', Validators.required],
      Role: [1, Validators.required]
    })
  }

  showaddCostPopup() {
    this.addCostVisible = true;
  }

  hideaddCostPopup() {
    this.addCostVisible = false;
  }
}
