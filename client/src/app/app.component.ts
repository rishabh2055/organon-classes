import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './_utils/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Organon Classes';
  currentRoute: string;
  userDetails: any;
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    router.events.subscribe(val => {
      this.currentRoute = location.path();
    });
  }

  ngOnInit(): void {
    this.userDetails = this.authService.getUser();
  }
}
