import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../common/service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {

  }

  ngOnInit(): void {
    console.log("LoginComponent")
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    })
  }

  eLogin() {
    this.authService.login(this.loginForm.getRawValue())
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl("/redirect").then();
        }
      })
  }
}
