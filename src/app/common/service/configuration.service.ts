import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, map, of, throwError } from 'rxjs';
import { ApiConstants } from '../constants/ApiConstants';
import { BaseService } from './base.service';
import { MessageService } from 'primeng/api';
import { BaseResponseModel } from '../model/base-response.model';
import { Router } from '@angular/router';

export class ConfigModel{
  code!: string;
  key!: string;
  value!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService extends BaseService {
  constructor(
    public override http: HttpClient,
    protected override messageService: MessageService,
    public override router: Router 
  ) {
    super(http, messageService, router);
  }

  private static configuration: Record<string, Record<string, string>> | null = null;
  private static loadingConfig$: Observable<any | null>;

  public getAllConfig() {
    // Access messageService through the BaseService class methods
    let result$ = new Subject();
    ConfigurationService.loadingConfig$ = result$.asObservable();
    this.getRequest<ConfigModel>(`${ApiConstants.CONFIG}`)
      .subscribe(
        (response) => { // update the type of response to `any`
          ConfigurationService.configuration = {};
          response.dataList.forEach((configItem: { code: string | number; key: string | number; value: string; }) => {
            if (!ConfigurationService.configuration) { // add null check
              ConfigurationService.configuration = {};
            }
            if (!ConfigurationService.configuration[configItem.code]) {
              ConfigurationService.configuration[configItem.code] = {};
            }
            if (ConfigurationService.configuration) { // add null check
              ConfigurationService.configuration[configItem.code][configItem.key] = configItem.value;
            }
          });
          if (ConfigurationService.configuration) { // add null check
            result$.next(ConfigurationService.configuration);
          }
          ConfigurationService.loadingConfig$ = of(null); // create a new observable that emits null
        },
        (error: any) => {
          console.log('Error Loading Config');
          ConfigurationService.configuration = null;
          result$.next(null);
          ConfigurationService.loadingConfig$ = of(null); // create a new observable that emits null
        }
      );
  }

  public getConfig(code: string): Observable<ConfigModel> {
    return this.getRequest<ConfigModel>(`${ApiConstants.CONFIG_CONTROLLER}/${code}`)
      .pipe(
        map((response: BaseResponseModel<ConfigModel>) => response.Data),
        catchError((error: any) => {
          console.log(`Error getting config with code ${code}: `, error);
          return throwError(error);
        })
      );
  }
}



