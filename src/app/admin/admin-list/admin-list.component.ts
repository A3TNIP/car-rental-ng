import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  configurationData: any;
  adminVisible: boolean = false;
  public adminForm!: FormGroup;
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
    this.adminForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      Phone: ['', Validators.required],
      Address: ['', Validators.required], 
      Name: ['', Validators.required],
      Role: [1, Validators.required]
    })
  }

  showadminPopup() {
    this.adminVisible = true;
  }

  hideadminPopup() {
    this.adminVisible = false;
  }
}
