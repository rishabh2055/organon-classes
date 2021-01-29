import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_utils/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  public userDetails: any;
  public isCollapsed: Boolean = false;
  public firstName: String;
  public lastName: String;
  isLoggedIn: Boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
   }

   ngOnInit(): void {
     this.isCollapsed = false;
    this.authService.isLoggedInDetails.subscribe(
      isAuthorized => {
        this.isLoggedIn = isAuthorized;
        if(this.isLoggedIn){
          this.getAuthenticationDetails();
        }
      }
    );
  }

  getAuthenticationDetails(){
    this.userDetails = this.authService.getUser();
    const tempName = this.userDetails.name.split(' ');
    this.firstName = tempName[0];
    this.lastName = tempName[tempName.length - 1];
  }

  logout(){
    this.authService.signout();
    this.router.navigate(['/login']);
  }

  toggleNavbar(){
    document.querySelector('html').classList.toggle('nav-open');
    document.querySelector('.navbar-toggler').classList.toggle('toggled');
  }

  collapsed(event:any): void {
    console.log(event);
  }

  expanded(event:any): void {
    console.log(event);
  }

  ngOnDestroy(){
    this.isCollapsed = false;
  }

}
