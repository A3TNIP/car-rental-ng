import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { ConfigurationService } from 'src/app/common/service/configuration.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  configurationData:any[] = [];

  constructor(public service: ConfigurationService) { }

  ngOnInit() {
    this.fetchConfigList();
    this.service.getConfig("Test");
  }

  private fetchConfigList() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.CONFIG}`)
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
      console.log('after api call', this.configurationData);
  }
}
