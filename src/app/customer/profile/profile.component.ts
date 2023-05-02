import {Component, OnInit} from '@angular/core';
import {ApiConstants} from 'src/app/common/constants/ApiConstants';
import {BaseService} from 'src/app/common/service/base.service';
import {LoaderService} from 'src/app/common/service/loader.service';
import {Roles} from 'src/app/common/model/roles';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDto!: any;
  isEditMode: boolean = false;
  editedUserDto!: any;
  currentUser!: any;
  roleName!: any;
  latestRental!: any;
  showDocumentUpload: boolean = false;
  changepwVisible: boolean = false;
  public changePasswordForm!: FormGroup;

  constructor(private service: BaseService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.roleName = this.currentUser.roleName;
    //GET USER DTO
    this.getUserDto();
    LoaderService.show();

//GET RENTAL BY USER ID from User Dto
    this.service.getRequest(`${ApiConstants.RENTAL_CONTROLLER}${ApiConstants.USER}`, this.userDto).subscribe({
      next: (res: any) => {
        const length = res.dataList.length;
        this.latestRental = res.dataList[length - 1];
        LoaderService.hide();
        // make API call to fetch each car detail
        LoaderService.show();
        if (res.dataList.length > 0) this.service.getRequest(`${ApiConstants.CARS_CONTROLLER}/${this.latestRental.carId}`).subscribe((car) => {
          this.latestRental.car = car.data;
          LoaderService.hide();
        });
        LoaderService.hide();
      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });
  }

  private initForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required],
    });
  }

  private getUserDto() {
    LoaderService.show();
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.GET_DTO}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        this.userDto = res.data;
        this.editedUserDto = {
          name: this.userDto.name,
          address: this.userDto.address,
          email: this.userDto.email,
          phoneNumber: this.userDto.phoneNumber,
          password: "",
        };
      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });
  }


  public onSave() {
    this.userDto.name = this.editedUserDto.name;
    this.userDto.address = this.editedUserDto.address;
    this.userDto.phoneNumber = this.editedUserDto.phoneNumber;
    LoaderService.show();
    this.service.patchRequest(this.userDto, `${ApiConstants.USER_CONTROLLER}`).subscribe({
      next: (res: any) => {
        LoaderService.hide();
        this.service.showToast("Success", 'success', "Profile updated successfully");
        this.getUserDto();
        this.isEditMode = false;
      },
      error: (err: any) => {
        LoaderService.hide();
        console.error(err);
      },
    });
  }

  public onCancel() {
    this.isEditMode = false;
  }

  showchangepwPopup() {
    this.changepwVisible = true;
  }

  hidechangepwPopup() {
    this.changepwVisible = false;
  }

  updatePassword() {
    if (this.changePasswordForm.invalid) return;
    if (this.changePasswordForm.value.newPassword !== this.changePasswordForm.value.confirmPassword) {
      this.service.showToast("Error", 'error', "Password and Confirm Password do not match");
      return;
    }
    this.service.postRequest(this.changePasswordForm.getRawValue(),
      `${ApiConstants.AUTHENTICATION_CONTROLLER}${ApiConstants.CHANGE_PASSWORD}`)
      .subscribe({
        next: (res) => {
          this.service.showToast("Success", 'success', "Password updated successfully, please login again");
          setTimeout(() => {
              this.service.logout();
            },
            2000);
        }
      })
  }
}
