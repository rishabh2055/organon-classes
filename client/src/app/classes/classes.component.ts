import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../_utils/class.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  public classForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
  public classId: Number;
  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const currentState: any = this.location.getState();
    this.route.params.subscribe(params => {
      this.classId = params?.id;
      if(this.classId){
        this.getClassDetails();
      }
    });

    this.classForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.classForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.classForm.invalid) {
      return;
    }
    this.disableSubmit = true;
    const postObj = {
      classId: this.classId,
      name: this.f.name.value,
    };

    this.classService.addNewClass(postObj).subscribe(
      (response: any) => {
        Swal.fire(
          'Success',
          'Saved Successfully!',
          'success'
        );
        this.submitted = false;
        this.classForm.reset();
        this.classForm.markAsPristine();
        this.classForm.markAsUntouched();
        this.disableSubmit = false;
        setTimeout(() => {
          this.router.navigate([`/`], { state: { currentPage: 'Classes' }});
        }, 100);
      }, (error) => {
        this.disableSubmit = false;
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getClassDetails(){
    this.classService.getClass(this.classId).subscribe(
      (response) => {
        this.classForm.patchValue({
          name: response.name,
        });
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

}
