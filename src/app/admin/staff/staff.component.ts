import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  staffData!: any;
  staffVisible: boolean = false;
  public staffForm!: FormGroup;

  constructor(private service:BaseService, private http: HttpClient,private fb: FormBuilder) { }

  private fetchStaffs() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.STAFF}`)
      .subscribe({
        next: (res: any) => {
          LoaderService.hide();
          if (res && res.dataList) {
            this.staffData = res.dataList.map((admin: any) => {
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
    this.fetchStaffs();
    this.staffForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      ConfirmPassword: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      Name: ['', Validators.required],
      Role: [1, Validators.required]
    })
  }

  showstaffPopup() {
    this.staffVisible = true;
  }

  hidestaffPopup() {
    this.staffVisible = false;
  }

  public addStaff(staff: any) {
    LoaderService.show();
    delete staff.id; // remove id field from config object
    this.service.postRequest(staff,`${ApiConstants.AUTHENTICATION_CONTROLLER}${ApiConstants.REGISTER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        if (res.isSuccess) {
          this.hidestaffPopup();
          this.service.showToast('Success', 'success', 'Staff registered successfully');
          this.staffForm.reset();
          this.fetchStaffs();
        }
      },
      error: (err: any) => {
        console.error('Failed to register admin', err);
        LoaderService.hide();
      },
    });
  }

  deleteStaff(staff: any) {
    LoaderService.show();
    this.service.deleteRequest(`${ApiConstants.USER_CONTROLLER}/${staff.id}`).subscribe({
      next: (res: any) => {
        if (res.message == 'User deleted successfully') {
          this.service.showToast('Staff Deleted successfully');
          this.fetchStaffs();
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
