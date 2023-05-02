import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  configurationData:any[] = [];
  configForm!: FormGroup;
  isUpdate!: boolean;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }

  ngOnInit() {
    this.fetchConfigList();
    this.configForm = this.fb.group({
      id: [""],
      code: ['', Validators.required],
      key: ['', Validators.required],
      value: ['', Validators.required],
    });
  }

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

  public deleteConfig(config: any) {
    LoaderService.show();
    this.service.deleteRequest(`${ApiConstants.CONFIG_CONTROLLER}/${config.id}`).subscribe({
      next: (res: any) => {
        if (res.message == 'Configuration deleted successfully') {
          this.service.showToast('Deleted successfully');
          // Remove the deleted config from the configurationData array
          this.fetchConfigList();
        }
        LoaderService.hide();
      },
      error: (err: any) => {
        console.error('Failed to delete configuration', err);
        LoaderService.hide();
      },
    });
  }


  public addConfig(config: any) {
    LoaderService.show();
    delete config.id; // remove id field from config object
    this.service.postRequest(config,`${ApiConstants.CONFIG_CONTROLLER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        if (res.isSuccess) {
          console.log('Configuration added successfully');
          this.service.showToast('Success', 'success', 'Configuration added successfully');
          this.configForm.reset();
          this.fetchConfigList();
        }
      },
      error: (err: any) => {
        console.error('Failed to add configuration', err);
        LoaderService.hide();
      },
    });
  }


  public updateConfig(config: any) {
    LoaderService.show();
    console.log(config);
    const updatedconfig = {
      ...config,
      key: this.configForm.get('key')!.value,
      value: this.configForm.get('value')!.value,
      code: this.configForm.get('code')!.value
    };
    this.service.putRequest(updatedconfig,`${ApiConstants.CONFIG_CONTROLLER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        if (res && res.isSuccess) {
          console.log('Configuration updated successfully');
          this.isUpdate = false;
          this.configForm.reset();
          this.fetchConfigList();
          this.service.showToast('Success', 'success', 'Configuration updated successfully');
        }
      },
      error: (err: any) => {
        console.error('Failed to update configuration', err);
        LoaderService.hide();
      },
    });
  }


  public populateForm(config: any) {
    this.configForm.setValue({
      id:config.id,
      key: config.key,
      value: config.value,
      code: config.code
    });
    this.isUpdate = true;
  }


  public resetForm(){
    this.configForm.reset()
    this.isUpdate = false;
  }
}
