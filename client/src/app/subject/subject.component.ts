import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StreamService } from '../_utils/stream.service';
import { ClassService } from '../_utils/class.service';
import { SubjectService } from '../_utils/subject.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  public subjectForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
  public subjectId: Number;
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
  constructor(
    private fb: FormBuilder,
    private streamService: StreamService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const currentState: any = this.location.getState();
    this.route.params.subscribe(params => {
      this.subjectId = params?.id;
      if(this.subjectId){
        this.getSubjectDetails();
      }
    });

    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      stream: ['', Validators.required]
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
            this.subjectForm.patchValue({
              stream: ''
            });
          }
        }else if(this.streamsList.length === 0){
          this.subjectForm.patchValue({
            stream: ''
          });
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.streamsList = [];
        this.subjectForm.patchValue({
          stream: ''
        });
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.subjectForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.subjectForm.invalid) {
      return;
    }
    this.disableSubmit = true;
    const postObj = {
      subjectId: this.subjectId,
      name: this.f.name.value,
      class: this.f.class.value,
      stream: this.f.stream.value
    };

    this.subjectService.addNewSubject(postObj).subscribe(
      (response: any) => {
        Swal.fire(
          'Success',
          'Saved Successfully!',
          'success'
        );
        this.submitted = false;
        this.subjectForm.reset();
        this.subjectForm.markAsPristine();
        this.subjectForm.markAsUntouched();
        this.disableSubmit = false;
        setTimeout(() => {
          this.router.navigate([`/`], { state: { currentPage: 'Subjects' }});
        }, 100);
      }, (error) => {
        this.disableSubmit = false;
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getSubjectDetails(){
    this.subjectService.getSubject(this.subjectId).subscribe(
      (response) => {
        this.subjectForm.patchValue({
          name: response.name,
          class: response.class,
          stream: response.stream
        });
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

}
