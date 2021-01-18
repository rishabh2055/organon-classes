import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_utils/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public isCollapsed: boolean = false;
  public userDetails: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAuthenticationDetails();
  }

  getAuthenticationDetails(){
    this.userDetails = this.authService.getUser();
  }

  logout(){
    this.router.navigate(['/logout']);
  }

  collapsed(event:any): void {
    console.log(event);
  }

  expanded(event:any): void {
    console.log(event);
  }
}
