import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StreamService } from '../_utils/stream.service';
import { ClassService } from '../_utils/class.service';
import { SubjectService } from '../_utils/subject.service';
import { TopicService } from '../_utils/topic.service';
import { SectionService } from '../_utils/section.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  public sectionForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
  public sectionId: Number;
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
  public topicConfig = {
    displayKey : 'name',
    search : true,
    height : 'auto',
    placeholder : 'Select a topic',
    noResultsFound : 'No results found!',
    searchPlaceholder : 'Search',
    searchOnKey : 'name',
    clearOnSelection : false,
    inputDirection : 'ltr'
  };
  public classesList: Array<any> = [];
  public streamsList: Array<any> = [];
  public subjectsList: Array<any> = [];
  public topicsList: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private streamService: StreamService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private sectionService: SectionService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    const currentState: any = this.location.getState();
    this.route.params.subscribe(params => {
      this.sectionId = params?.id;
      if(this.sectionId){
        this.getSectionDetails();
      }
    });

    this.sectionForm = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      stream: ['', Validators.required],
      subject: ['', Validators.required],
      topic: ['', Validators.required]
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
            this.sectionForm.patchValue({
              stream: '',
              subject: '',
              topic: ''
            });
            this.subjectsList = [];
            this.topicsList = [];
          }
        }else if(this.streamsList.length === 0){
          this.sectionForm.patchValue({
            stream: '',
            subject: '',
            topic: ''
          });
          this.subjectsList = [];
          this.topicsList = [];
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.streamsList = [];
        this.subjectsList = [];
        this.topicsList = [];
        this.sectionForm.patchValue({
          stream: '',
          subject: '',
          topic: ''
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
            this.sectionForm.patchValue({
              subject: '',
              topic: ''
            });
            this.topicsList = [];
          }
        }else if(this.subjectsList.length === 0){
          this.sectionForm.patchValue({
            subject: '',
            topic: ''
          });
          this.topicsList = [];
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.subjectsList = [];
        this.topicsList = [];
        this.sectionForm.patchValue({
          subject: '',
          topic: ''
        });
      }
    );
  }
  getAllTopics() {
    this.topicService.getAllTopicList(this.f.subject.value).subscribe(
      (response) => {
        this.topicsList = response;
        if(this.topicsList.length > 0 && this.f.topic.value !== ''){
          let foundObj = false;
          this.topicsList.map(tp => {
            if(tp.id === this.f.topic.value.id){
              foundObj = true;
            }
          });
          if(!foundObj){
            this.sectionForm.patchValue({
              topic: ''
            });
          }
        }else if(this.topicsList.length === 0){
          this.sectionForm.patchValue({
            topic: ''
          });
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.topicsList = [];
        this.sectionForm.patchValue({
          topic: ''
        });
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.sectionForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.sectionForm.invalid) {
      return;
    }
    this.disableSubmit = true;
    const postObj = {
      sectionId: this.sectionId,
      name: this.f.name.value,
      class: this.f.class.value,
      stream: this.f.stream.value,
      subject: this.f.subject.value,
      topic: this.f.topic.value
    };

    this.sectionService.addNewSection(postObj).subscribe(
      (response: any) => {
        Swal.fire(
          'Success',
          'Saved Successfully!',
          'success'
        );
        this.submitted = false;
        this.sectionForm.reset();
        this.sectionForm.markAsPristine();
        this.sectionForm.markAsUntouched();
        this.disableSubmit = false;
        setTimeout(() => {
          this.router.navigate([`/`], { state: { currentPage: 'Sections' }});
        }, 100)
      }, (error) => {
        this.disableSubmit = false;
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getSectionDetails(){
    this.sectionService.getSection(this.sectionId).subscribe(
      (response) => {
        this.sectionForm.patchValue({
          name: response.name,
          class: response.class,
          stream: response.stream,
          subject: response.subject,
          topic: response.topic
        });
        this.getAllStreams();
        this.getAllSubjects();
        this.getAllTopics();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

}
