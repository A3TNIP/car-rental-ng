import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if user is logged in by checking if there are token and currentUser keys in local storage
    if (localStorage.getItem('token')!) {
    //   // if it does exist redirect to redirect component
      this.router.navigate(['/redirect']).then();
      return false;
    } else {
    //   make sure the localstorage is clear
      localStorage.clear();
      return true;
    }
  }
}
