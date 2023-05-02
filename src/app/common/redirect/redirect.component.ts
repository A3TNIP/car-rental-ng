import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {UserService} from "../service/user.service";
import {LoaderService} from "../service/loader.service";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit{

  private role!: string;
  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService) {
  }

   ngOnInit(): void {
    this.getPrincipal();
  }

  private redirect() {
    let role = this.role
    switch (role) {
      case "Admin":
        this.router.navigateByUrl('/dashboard').then(
          () => LoaderService.hide()
        );
        break;
      case "Staff":
        this.router.navigateByUrl('/dashboard').then(
          () => LoaderService.hide()
        );
        break;
      case "Customer":
        this.router.navigateByUrl('/customer/home').then(
          () => LoaderService.hide()
        );
        break;
      default:
        this.router.navigateByUrl('/login').finally();
        console.log("redirect to login")
    }
  }


  private getPrincipal() {
    LoaderService.show();
    this.authService.getPrincipal().subscribe({
      next: (response: any) => {
        this.userService.setCurrentUser(response);
        this.role = response.roleName;
        this.redirect();
      },
      error: (err: any) => {
      //   if error is 401, redirect to home
        if (err.status === 401) {
          this.router.navigateByUrl('/home').then(
            () => location.reload()
          );
          LoaderService.hide();
        }
      }
    })
  }
}
