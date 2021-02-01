import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './_utils/auth.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('topPanel') topPanel;
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
      const firstURL = this.currentRoute.split('/');
      if(firstURL[1] !== 'student' && firstURL[1] !== 'profile' && firstURL[1] !== 'login'){
        document.querySelector('.top-panel').classList.add('main-panel');
      }else{
        document.querySelector('.top-panel').classList.remove('main-panel');
      }
    });
  }

  ngOnInit(): void {
    this.userDetails = this.authService.getUser();
  }

  ngAfterViewInit(){
    
  }
}
