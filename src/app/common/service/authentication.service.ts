import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../constants/ApiConstants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public http: HttpClient) { }

  public login(model: any) {
    return this.http.post(`${ApiConstants.AUTHENTICATION_CONTROLLER}/Login`, model);
  }
  public register(model: any) {
    return this.http.post(`${ApiConstants.AUTHENTICATION_CONTROLLER}/Register`, model);
  }

  public logout() {
    localStorage.clear();
  }

  public isAuthenticated(): boolean {
    return localStorage.getItem('token') != null;
  }

  public getPrincipal() {
    return this.http.get(`${ApiConstants.AUTHENTICATION_CONTROLLER}/Principal`);
  }

  public getSubject() {
    return JSON.parse(localStorage.getItem('subject')!);
  }

  private hasRole(role: string): boolean {
    return this.getSubject().roleName == role;
  }
  private getRoleBoolean(role: string) {
    return {
      admin: this.hasRole('Admin'),
      staff: this.hasRole('Staff'),
      customer: this.hasRole('Customer'),
      loggedIn: this.isAuthenticated()
    }
  }

}
