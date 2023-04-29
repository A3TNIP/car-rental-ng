import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public currentUser!: any;
  public static loggedIn: boolean;

  constructor() {
    this.reloadUserData();
  }

  public setCurrentUser(user: any){
    this.currentUser = user;
    UserService.loggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(user)!);
  }

  public static getCurrentUser(): any{
    return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
  }

  public reloadUserData() {
    try {
      this.currentUser = localStorage.getItem('currentUser')!;
      UserService.loggedIn = !!this.currentUser;
    } catch (e) {
      // Do nothing
    }
  }
}
