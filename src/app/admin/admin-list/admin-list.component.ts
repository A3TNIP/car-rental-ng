import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent {
  adminData!: any;
  adminVisible: boolean = false;
  public adminForm!: FormGroup;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }

  private fetchAdmins() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.ADMIN}`)
      .subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res && res.dataList) {
            this.adminData = res.dataList.map((admin: any) => {
              return {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                address: admin.address,
                phoneNumber: admin.phoneNumber,
                document: admin.document,
              }
            })
          }
        }
      });
  }

  ngOnInit(): void {
    this.fetchAdmins();
    this.adminForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Name: ['', Validators.required],
      Role: [0, Validators.required]
    })
  }

  showadminPopup() {
    this.adminVisible = true;
  }

  hideadminPopup() {
    this.adminVisible = false;
  }

  public addAdmin(admin: any) {
    LoaderService.show();
    delete admin.id; // remove id field from config object
    this.service.postRequest(admin,`${ApiConstants.AUTHENTICATION_CONTROLLER}${ApiConstants.REGISTER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        if (res.isSuccess) {
          this.hideadminPopup();
          this.service.showToast('Success', 'success', 'Admin registered successfully');
          this.adminForm.reset();
          this.fetchAdmins();
        }
      },
      error: (err: any) => {
        console.error('Failed to register admin', err);
        LoaderService.hide();
      },
    });
  }

  deleteAdmin(admin: any) {
    LoaderService.show();
    this.service.deleteRequest(`${ApiConstants.USER_CONTROLLER}/${admin.id}`).subscribe({
      next: (res: any) => {
        if (res.message == 'User deleted successfully') {
          this.service.showToast('Admin Deleted successfully');
          this.fetchAdmins();
        }
        LoaderService.hide();
      },
      error: (err: any) => {
        console.error('Failed to delete user', err);
        LoaderService.hide();
      },
    });
  }
}
