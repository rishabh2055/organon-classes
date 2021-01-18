import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StreamService } from '../_utils/stream.service';
import { ClassService } from '../_utils/class.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  public streamForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
  public streamId: Number;
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
  public classesList: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private streamService: StreamService,
    private classService: ClassService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const currentState: any = this.location.getState();
    this.route.params.subscribe(params => {
      this.streamId = params?.id;
      if(this.streamId){
        this.getStreamDetails();
      }
    });

    this.streamForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required]
    });
    this.getAllClasses();
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

  // convenience getter for easy access to form fields
  get f() { return this.streamForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.streamForm.invalid) {
      return;
    }
    this.disableSubmit = true;
    const postObj = {
      streamId: this.streamId,
      name: this.f.name.value,
      class: this.f.class.value
    };

    this.streamService.addNewStream(postObj).subscribe(
      (response: any) => {
        Swal.fire(
          'Success',
          'Saved Successfully!',
          'success'
        );
        this.submitted = false;
        this.streamForm.reset();
        this.streamForm.markAsPristine();
        this.streamForm.markAsUntouched();
        this.disableSubmit = false;
        setTimeout(() => {
          this.router.navigate([`/`], { state: { currentPage: 'Streams' }});
        }, 100);
      }, (error) => {
        this.disableSubmit = false;
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getStreamDetails(){
    this.streamService.getStream(this.streamId).subscribe(
      (response) => {
        this.streamForm.patchValue({
          name: response.name,
          class: response.class
        });
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

}
