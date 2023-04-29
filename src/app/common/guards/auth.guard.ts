import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toast: MessageService, private userService: UserService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userService.reloadUserData();
    // Check if the user is logged in
    if (!UserService.getCurrentUser()) {
      // if it does not exist redirect to log in component
      this.router.navigate(['/login']).then();
      // add a toast
      this.toast.add({severity: 'warn', summary: 'Error', detail: 'You have been logged out'});
      // Route Blocked no user logged in
      return false;
    }
    // Check for roles of the current user & check if the user has the required role
    if (route.data['roles'] && !this.hasRole(route.data['roles'])) {
      // if it does not exist redirect to redirect component and add a toast
      this.router.navigate(['/redirect']).then();
      this.toast.add({severity: 'error', summary: 'Error', detail: 'You do not have the required role'});
      // Route Blocked no proper role
      return false;
    }
    // if ok return true
    return true;
  }

  private hasRole(datum: string[]) {
    let hasRole = false;
    let roles: string = UserService.getCurrentUser().roleName;
    console.log(datum);
    console.log(roles);
    return datum.includes(roles);
  }

}
