import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../common/service/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  confirmPassword: any;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Name: ['', Validators.required],
    });
  }

  eRegister() {
    if (this.registerForm.invalid) return;
    if (this.registerForm.get('Password')?.value !== this.registerForm.get('ConfirmPassword')?.value) return;
    // remove ConfirmPassword from the request body
    delete this.registerForm.value.ConfirmPassword;
    this.authService.register(this.registerForm.getRawValue())
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.Token);
        },
        error: (error: any) => {
          console.log(error);
        }
      })
  }
}
