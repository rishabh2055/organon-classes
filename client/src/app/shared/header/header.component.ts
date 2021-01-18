import { Component, OnInit } from '@angular/core';

declare var M: any; // materialize

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  constructor(

  ) {
   }

  ngOnInit(): void {

  }

  toggleNavbar(){
    document.querySelector('html').classList.toggle('nav-open');
    document.querySelector('.navbar-toggler').classList.toggle('toggled');
  }

}
