import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StreamService } from '../_utils/stream.service';
import { ClassService } from '../_utils/class.service';
import { UserService } from '../_utils/user.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
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
  public disabledField: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private streamService: StreamService,
    private classService: ClassService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params?.id;
      if(this.userId){
        this.disabledField = true;
        this.getUserDetails();
      }
    });
    this.userForm = this.fb.group({
      name: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      fName: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      city: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      address: [null, [Validators.maxLength(500), Validators.minLength(2)]],
      email: [{value: null, disabled: this.disabledField}],
      mobileNo: [{value: null, disabled: this.disabledField}],
      dob: [null, Validators.required],
      class: [null],
      stream: [null],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  getAllClasses() {
    this.classService.getAllClasses().subscribe(
      (response) => {
        this.classesList = response.classes;
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }
  getAllStreams() {
    this.streamService.getAllStreamList(this.f.class.value).subscribe(
      (response) => {
        this.streamsList = response;
        if(this.streamsList.length > 0 && this.f.stream.value !== ''){
          let foundStream = false;
          this.streamsList.map(stream => {
            if(stream.id === this.f.stream.value.id){
              foundStream = true;
            }
          });
          if(!foundStream){
            this.userForm.patchValue({
              stream: ''
            });
          }
        }else if(this.streamsList.length === 0){
          this.userForm.patchValue({
            stream: ''
          });
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.streamsList = [];
        this.userForm.patchValue({
          stream: ''
        });
      }
    );
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    this.disableSubmit = true;
    const postObj = {
      userId: this.userId,
      name: this.f.name.value,
      class: this.f.class.value,
      stream: this.f.stream.value,
      fName: this.f.fName.value,
      city: this.f.city.value,
      address: this.f.address.value,
      dob: this.f.dob.value
    };

    this.userService.addNewUser(postObj).subscribe(
      (response: any) => {
        Swal.fire(
          'Success',
          'Saved Successfully!',
          'success'
        );
        this.submitted = false;
        this.userForm.reset();
        this.userForm.markAsPristine();
        this.userForm.markAsUntouched();
        this.disableSubmit = false;
      }, (error) => {
        this.disableSubmit = false;
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getUserDetails(){
    this.userService.getUser(this.userId).subscribe(
      (response) => {
        this.userForm.patchValue({
          name: response.name,
          email: response.email,
          class: (Object.keys(response.studentDetails).length > 0)? response.studentDetails.class: null,
          stream: (Object.keys(response.studentDetails).length > 0)? response.studentDetails.stream: null,
          fName: response.fName,
          city: response.city,
          address: response.address,
          dob: new Date(response.dob),
          mobileNo: response.mobileNo
        });
        this.getAllClasses();
        this.getAllStreams();

      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

}
