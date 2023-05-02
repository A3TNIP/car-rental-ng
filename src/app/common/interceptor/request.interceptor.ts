import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiConstants} from '../constants/ApiConstants';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  public static whiteList: string[] = ["Login", "Register", "HomeController"];

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    for (let i = 0; i < RequestInterceptor.whiteList.length; i++) {
      if (request.url.includes(RequestInterceptor.whiteList[i])) return next.handle(request);
    }
    console.log(localStorage.getItem('token')!);
    if (localStorage.getItem('token')!) {
      const req = request.clone({
        headers: new HttpHeaders({
          "Authorization": `Bearer ${localStorage.getItem('token')!}`
        })
      });
      return next.handle(req);
    } else {
      return next.handle(request);
    }
  }

}
