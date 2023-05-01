import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { ApiConstants } from '../constants/ApiConstants';
import { MessageService } from 'primeng/api';
import { Observable, catchError, of } from 'rxjs';
import { BaseResponseModel } from '../model/base-response.model';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BaseService extends AuthenticationService {

  constructor(http: HttpClient, protected messageService: MessageService, public override router: Router) {
    super(http, router);
  }


  public showToast(message: string, type: string = 'success', detail: string = ''): void {
    this.messageService.add({severity: type, summary: message, detail: detail});
  }

  public getUrlWithRequestParams(baseUrl: string, obj: Record<string, any>): string {
    return baseUrl + '?' + Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
  }

  /**
   * POST request from the server
   */
  public postRequest<T = any>(model: any, url: string, noMessage = false): Observable<BaseResponseModel<T>> {
    // @ts-ignore
    return this.http.post<T>(url, model)
      .pipe(
        catchError(this.handleError<T>(undefined, noMessage))
      );
  }

  /**
   * GET request from the server
   */
  public getRequest<T = any>(url: string, noMessage = false): Observable<BaseResponseModel<T>> {
    // @ts-ignore
    return this.http.get<T>(url)
      .pipe(
        catchError(this.handleError<T>(undefined, noMessage))
      );
  }

  /**
   * Completely update the data on the server
   * @param model
   * @param url
   * @param noMessage
   * @returns
   */
  public putRequest<T = any>(model: any, url: string, noMessage = false): Observable<BaseResponseModel<T>> {
    // @ts-ignore
    return this.http.put<T>(url, model)
      .pipe(
        catchError(this.handleError<T>(undefined, noMessage))
      );
  }

  /**
   * Partially update the data on the server
   * @param model
   * @param url
   * @param noMessage
   * @returns
   */
  public patchRequest<T = any>(model: any, url: string, noMessage = false): Observable<BaseResponseModel<T>> {
    // @ts-ignore
    return this.http.patch<T>(url, model)
      .pipe(
        catchError(this.handleError<T>(undefined, noMessage))
      );
  }

  /**
   * DELETE: delete the data from the server
   */
  public deleteRequest<T = any>(apiUrl: string): Observable<any> {
    return this.http.delete<T>(apiUrl)
      .pipe(
        catchError(this.handleError<T>(undefined))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param result - optional value to return as the observable result
   * @param noMessage - do not show pop up
   */
  public handleError<E>(result?: E, noMessage = false) {
    return (error: any): Observable<E> => {
      // Show dialog to user
      this.log(error, noMessage);
      // Let the app keep running by returning an empty result.
      throw of(result as E);
    };
  }


  /**
   * Log a message with the MessageService
   */
  protected log(errorModel: any, noMessage = false) {
    console.log(errorModel);
    if (errorModel && !noMessage) {
      const msg = (!!errorModel.error.message && errorModel.error.message.length < 80) ? errorModel.error.message : 'An error occurred';
      switch (errorModel.status) {
        case 401:
          // Invalid Session
          this.logout();
          setTimeout(() => {
            location.reload();
          }, 1500);
          break;
        case 400:
          // Bad Request
          this.showToast('Warning', 'warn', msg);
          break;
        case 504:
          // Timeout issue
          break;
        case 500:
          // Server Issues
          this.showToast('Error', 'error', msg);
          break;
        default:
          this.showToast('Error', 'error', msg);
        // Other Errors
      }
    }
  }
}
