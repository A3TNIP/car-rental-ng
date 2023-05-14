import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  noNavRoutes = ["/login", "/register"];
  noNav = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe({
      next: (next) => {
        this.noNav = this.noNavRoutes.includes(this.router.url);
      }
    })
  }
}