import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-damages',
  templateUrl: './damages.component.html',
  styleUrls: ['./damages.component.css']
})
export class DamagesComponent implements OnInit{
  configurationData: any;
  addCostVisible: boolean = false;
  staffForm: any;
  private damageModel!: any;
  formBuilder: any;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }

  private fetchDamages() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.DAMAGE_CONTROLLER}`)
      .subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res && res.dataList) {
            this.configurationData = res.dataList.filter((item: any) => item.repairCost == null);
            console.log(res.dataList)
          }
        }
      });
  }

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      Cost: ['', Validators.required],
    })
    this.fetchDamages();
  }

  showaddCostPopup(damage: any) {
    this.addCostVisible = true;
    this.damageModel = damage;
  }

  hideaddCostPopup() {
    this.addCostVisible = false;
  }

  completeDamage() {
    this.damageModel = {
      ...this.damageModel,
      repairCost: this.staffForm.get('Cost').value
    }

    console.log(this.damageModel)
    return;
    this.service.putRequest(this.damageModel, `${ApiConstants.DAMAGE_CONTROLLER}/complete`)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.service.showToast("Success", "success", "Damage Cost Added Successfully")
            this.hideaddCostPopup();
            this.fetchDamages();
          }
        }
      })
  }
}
