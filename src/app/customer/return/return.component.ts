import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-return',
  templateUrl: './return.component.html',
  styleUrls: ['./return.component.css']
})
export class ReturnComponent implements OnInit {
  private response!: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.sendKhaltiRequest();
  }

  billingVisible: boolean = false;

  showbillingPopup() {
    this.billingVisible = true;
  }

  hidebillingPopup() {
    this.billingVisible = false;
  }

  private sendKhaltiRequest() {
    const payload =
      {
        "public_key": "test_public_key_4bf95fec8fe2462291dc226195dc83b0",
        "mobile": "9861179414",
        "transaction_pin": "2020",
        "amount": 10000,
        "product_identity": "book/id-120",
        "product_name": "A Song of Ice and Fire",
        "product_url": "http://bookexample.com"
      }

    this.http.post('https://khalti.com/api/v2/payment/initiate/', payload)
      .subscribe({
        next: data => {
          this.response = data;
          console.log(data);
        }
      });
  }
}
