import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit{
  clientData!: any;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }

  ngOnInit():void{
    this.fetchClients();
  }
  private fetchClients() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.CUSTOMER}`)
      .subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res && res.dataList) {
            this.clientData = res.dataList.map((client: any) => {
              return {
                id: client.id,
                name: client.name,
                email: client.email,
                address: client.address,
                phoneNumber: client.phoneNumber,
                document: client.document,
              }
            })
          }
        }
      });
  }
}
