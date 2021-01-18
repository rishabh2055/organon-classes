import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
  public userId: Number;
  public classConfig = {
    displayKey : 'name',
    search : true,
    height : 'auto',
    placeholder : 'Select a class',
    noResultsFound : 'No results found!',
    searchPlaceholder : 'Search',
    searchOnKey : 'name',
    clearOnSelection : false,
    inputDirection : 'ltr'
  };
  public streamConfig = {
    displayKey : 'name',
    search : true,
    height : 'auto',
    placeholder : 'Select a stream',
    noResultsFound : 'No results found!',
    searchPlaceholder : 'Search',
    searchOnKey : 'name',
    clearOnSelection : false,
    inputDirection : 'ltr'
  };
  public classesList: Array<any> = [];
  public streamsList: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

}
