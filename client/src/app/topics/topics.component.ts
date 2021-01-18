import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StreamService } from '../_utils/stream.service';
import { ClassService } from '../_utils/class.service';
import { SubjectService } from '../_utils/subject.service';
import { TopicService } from '../_utils/topic.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {
  public topicForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
  public topicId: Number;
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
  public subjectConfig = {
    displayKey : 'name',
    search : true,
    height : 'auto',
    placeholder : 'Select a subject',
    noResultsFound : 'No results found!',
    searchPlaceholder : 'Search',
    searchOnKey : 'name',
    clearOnSelection : false,
    inputDirection : 'ltr'
  };
  public classesList: Array<any> = [];
  public streamsList: Array<any> = [];
  public subjectsList: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private streamService: StreamService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const currentState: any = this.location.getState();
    this.route.params.subscribe(params => {
      this.topicId = params?.id;
      if(this.topicId){
        this.getTopicDetails();
      }
    });

    this.topicForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      stream: ['', Validators.required],
      subject: ['', Validators.required]
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
            this.topicForm.patchValue({
              stream: '',
              subject: ''
            });
            this.subjectsList = [];
          }
        }else if(this.streamsList.length === 0){
          this.topicForm.patchValue({
            stream: '',
            subject: ''
          });
          this.subjectsList = [];
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.streamsList = [];
        this.subjectsList = [];
        this.topicForm.patchValue({
          stream: '',
          subject: ''
        });
      }
    );
  }
  getAllSubjects() {
    this.subjectService.getAllSubjectList(this.f.stream.value).subscribe(
      (response) => {
        this.subjectsList = response;
        if(this.subjectsList.length > 0 && this.f.subject.value !== ''){
          let foundObj = false;
          this.subjectsList.map(sub => {
            if(sub.id === this.f.subject.value.id){
              foundObj = true;
            }
          });
          if(!foundObj){
            this.topicForm.patchValue({
              subject: ''
            });
          }
        }else if(this.subjectsList.length === 0){
          this.topicForm.patchValue({
            subject: ''
          });
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.subjectsList = [];
        this.topicForm.patchValue({
          subject: ''
        });
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.topicForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.topicForm.invalid) {
      return;
    }
    this.disableSubmit = true;
    const postObj = {
      topicId: this.topicId,
      name: this.f.name.value,
      class: this.f.class.value,
      stream: this.f.stream.value,
      subject: this.f.subject.value
    };

    this.topicService.addNewTopic(postObj).subscribe(
      (response: any) => {
        Swal.fire(
          'Success',
          'Saved Successfully!',
          'success'
        );
        this.submitted = false;
        this.topicForm.reset();
        this.topicForm.markAsPristine();
        this.topicForm.markAsUntouched();
        this.disableSubmit = false;
        setTimeout(() => {
          this.router.navigate([`/`], { state: { currentPage: 'Topics' }});
        }, 100);
      }, (error) => {
        this.disableSubmit = false;
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getTopicDetails(){
    this.topicService.getTopic(this.topicId).subscribe(
      (response) => {
        this.topicForm.patchValue({
          name: response.name,
          class: response.class,
          stream: response.stream,
          subject: response.subject
        });
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

}
