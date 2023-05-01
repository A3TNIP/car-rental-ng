import { Component, OnInit } from '@angular/core';
import { ApiConstants } from 'src/app/common/constants/ApiConstants';
import { BaseService } from 'src/app/common/service/base.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  user!:any;
  userDto: any;
  rentalHistory: any[] = [];
  totalRentalsMade: number = 0;

  constructor(private service:BaseService) {
  }

  ngOnInit(): void {
    
    //GET EMAIL 
    this.user = localStorage.getItem('currentUser')
    console.log('CurrentUser is,',this.user);
    
    //GET USER DTO
    this.service.getRequest(`${ApiConstants.USER_CONTROLLER}${ApiConstants.GET_DTO}`,this.user).subscribe({
      next: (res: any) => {
        this.userDto = res.data;
        console.log('user ko dto is,',this.userDto);
      },
      error: (err: any) => {
        console.error(err);
      },
    });

  }
}
