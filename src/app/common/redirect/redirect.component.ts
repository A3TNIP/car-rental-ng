import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {UserService} from "../service/user.service";
import {LoaderService} from "../service/loader.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit{

  private role!: string;
  constructor(private authService: AuthenticationService, private router: Router, private userService: UserService, private messageService: MessageService) {
  }

   ngOnInit(): void {
    this.getPrincipal();
  }

  private redirect() {
    let role = this.role
    let hour = new Date().getHours();
    switch (role) {
      case "Admin":
        if (hour < 9 || hour > 23) {
          this.messageService.add({severity:'error', summary:'Error', detail:'You are not allowed to login at this time.'});
          this.authService.logout();
        }
        this.router.navigateByUrl('/dashboard').then(
          () => LoaderService.hide()
        );
        break;
      case "Staff":
        if (hour < 9 || hour > 17) {
          this.messageService.add({severity:'error', summary:'Error', detail:'You are not allowed to login at this time.'});
          this.authService.logout();
        }
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
          localStorage.clear();
          this.router.navigateByUrl('/home').then(
            () => location.reload()
          );
          LoaderService.hide();
        }
      }
    })
  }
}
