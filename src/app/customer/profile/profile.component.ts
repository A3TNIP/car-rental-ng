import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';
import { LoaderService } from 'src/app/common/service/loader.service';
import { Roles } from 'src/app/common/model/roles';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDto!:any;
  isEditMode : boolean = false;
  editedUserDto!: any;
  currentUser!:any;
  roleName!:any;
  changepwVisible: boolean = false;
  constructor(private service:BaseService) {
  }

  ngOnInit():void{
  this.currentUser = localStorage.getItem('currentUser');
  this.currentUser = JSON.parse(this.currentUser);
  this.roleName = this.currentUser.roleName;
  //GET USER DTO
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

  public onSave(){
    this.userDto.name = this.editedUserDto.name;
    this.userDto.address = this.editedUserDto.address;
    this.userDto.email = this.editedUserDto.email;
    this.userDto.phoneNumber = this.editedUserDto.phoneNumber;
    this.userDto.role = this.roleName;
    this.userDto.password = 'Test@123!';
    LoaderService.show();
    console.log(this.userDto);
    // this.service.patchRequest(requestBody,`${ApiConstants.USER_CONTROLLER}`).subscribe({
    //   next: (res: any) => {
    //     LoaderService.hide();
    //     console.log('updated data',res.data)
    //   },
    //   error: (err: any) => {
    //     LoaderService.hide();
    //     console.error(err);
    //   },
    //     });
  }

  public onCancel(){
    this.isEditMode = false;
  }

  showchangepwPopup() {
    this.changepwVisible = true;
  }

  hidechangepwPopup() {
    this.changepwVisible = false;
  }
}
