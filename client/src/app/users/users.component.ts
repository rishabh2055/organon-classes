import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/validators';
import { StreamService } from '../_utils/stream.service';
import { ClassService } from '../_utils/class.service';
import { UserService } from '../_utils/user.service';
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
  public roleConfig = {
    displayKey : 'name',
    search : true,
    height : 'auto',
    placeholder : 'Select a role',
    noResultsFound : 'No results found!',
    searchPlaceholder : 'Search',
    searchOnKey : 'name',
    clearOnSelection : false,
    inputDirection : 'ltr'
  };
  public classesList: Array<any> = [];
  public streamsList: Array<any> = [];
  public rolesList: Array<any> = [
    {id: 1, name: 'Admin'},
    {id: 2, name: 'Student'}
  ];
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
      email: [{value: null, disabled: this.disabledField}, [Validators.required, Validators.email]],
      mobileNo: [{value: null, disabled: this.disabledField}, [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      password: [null, Validators.minLength(6)],
      cPassword: [null],
      dob: [null, Validators.required],
      role: [null, Validators.required],
      class: [null],
      stream: [null],
    }, {
      validator: MustMatch('password', 'cPassword')
    });
    this.setOptionalFieldValidators();
  }

  // convenience getter for easy access to form fields
  get f() { return this.userForm.controls; }

  setOptionalFieldValidators(){
    const className = this.userForm.get('class');
    const stream = this.userForm.get('stream');
    this.userForm.get('role').valueChanges.subscribe(
      role => {
        if (role === 'Student'){
          className.setValidators([Validators.required]);
          stream.setValidators([Validators.required]);
        }
      }
    );
    this.userForm.get('password').valueChanges.subscribe(
      pass => {
        if (pass !== ''){
          this.userForm.get('cPassword').setValidators([Validators.required]);
        }
      }
    );
    if(this.userId === undefined){
      this.userForm.get('password').setValidators([Validators.required]);
      this.userForm.get('cPassword').setValidators([Validators.required]);
    }
  }

  changeRole(){
    if(this.f.role.value.name === 'Student'){
      this.getAllClasses();
    }
  }

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
      email: (this.userId !== undefined) ? '': this.f.email.value,
      class: this.f.class.value,
      stream: this.f.stream.value,
      fName: this.f.fName.value,
      city: this.f.city.value,
      address: this.f.address.value,
      password: this.f.password.value,
      mobileNo: (this.userId !== undefined) ? '': this.f.mobileNo.value,
      dob: this.f.dob.value,
      role: this.f.role.value
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
        setTimeout(() => {
          this.router.navigate([`/`], { state: { currentPage: 'Users' }});
        }, 100);
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
          role: (response.role === 'Admin') ? this.rolesList[0]: this.rolesList[1],
          mobileNo: response.mobileNo
        });
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

}
