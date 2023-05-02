import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../constants/ApiConstants';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http: HttpClient, public router: Router) { }

  public login(model: any) {
    return this.http.post(`${ApiConstants.AUTHENTICATION_CONTROLLER}/Login`, model);
  }
  public register(model: any) {
    return this.http.post(`${ApiConstants.AUTHENTICATION_CONTROLLER}/Register`, model);
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['/home']).then();
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('token') != null;
  }

  public getPrincipal() {
    return this.http.get(`${ApiConstants.AUTHENTICATION_CONTROLLER}/Principal`);
  }

  public getSubject() {
    return JSON.parse(localStorage.getItem('currentUser') ?? '{}');
  }
  public getRoleBoolean() {
    return {
      admin: this.getSubject().roleName == 'Admin',
      staff: this.getSubject().roleName == 'Staff',
      customer: this.getSubject().roleName == 'Customer',
      loggedIn: this.isAuthenticated()
    }
  }

}
