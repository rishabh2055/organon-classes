import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StreamService } from '../_utils/stream.service';
import { ClassService } from '../_utils/class.service';
import { SubjectService } from '../_utils/subject.service';
import { TopicService } from '../_utils/topic.service';
import { SectionService } from '../_utils/section.service';
import { QuestionService } from '../_utils/question.service';
import { AuthService } from '../_utils/auth.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  public questionForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
  public questionId;
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
  public sectionConfig = {
    displayKey : 'name',
    search : true,
    height : 'auto',
    placeholder : 'Select a section',
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
  public sectionsList: Array<any> = [];
  public imageSrc: SafeUrl;
  constructor(
    private fb: FormBuilder,
    private streamService: StreamService,
    private classService: ClassService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private sectionService: SectionService,
    private questionService: QuestionService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {
    if(this.authService.getUser().role === 'Student'){
      this.router.navigate([`student`]);
    }
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.questionId = params?.id;
      if(this.questionId){
        this.getQuestionDetails();
      }
    });

    this.questionForm = this.fb.group({
      question: ['', Validators.required],
      class: ['', Validators.required],
      stream: ['', Validators.required],
      subject: ['', Validators.required],
      topic: ['', Validators.required],
      section: ['', Validators.required],
      fileSource: ['', Validators.required],
      video: ['', Validators.required]
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
            this.questionForm.patchValue({
              stream: '',
              subject: '',
              topic: '',
              section: ''
            });
            this.subjectsList = [];
            this.topicsList = [];
            this.sectionsList = [];
          }
        }else if(this.streamsList.length === 0){
          this.questionForm.patchValue({
            stream: '',
            subject: '',
            topic: '',
            section: ''
          });
          this.subjectsList = [];
          this.topicsList = [];
          this.sectionsList = [];
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.streamsList = [];
        this.subjectsList = [];
        this.topicsList = [];
        this.sectionsList = [];
        this.questionForm.patchValue({
          stream: '',
          subject: '',
          topic: '',
          section: ''
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
            this.questionForm.patchValue({
              subject: '',
              topic: '',
              section: ''
            });
            this.topicsList = [];
            this.sectionsList = [];
          }
        }else if(this.subjectsList.length === 0){
          this.questionForm.patchValue({
            subject: '',
            topic: '',
            section: ''
          });
          this.topicsList = [];
          this.sectionsList = [];
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.subjectsList = [];
        this.topicsList = [];
        this.sectionsList = [];
        this.questionForm.patchValue({
          subject: '',
          topic: '',
          section: ''
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
            this.questionForm.patchValue({
              topic: '',
              section: ''
            });
            this.sectionsList = [];
          }
        }else if(this.topicsList.length === 0){
          this.questionForm.patchValue({
            topic: '',
            section: ''
          });
          this.sectionsList = [];
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.topicsList = [];
        this.sectionsList = [];
        this.questionForm.patchValue({
          topic: '',
          section: ''
        });
      }
    );
  }

  getAllSections() {
    this.sectionService.getAllSectionList(this.f.topic.value).subscribe(
      (response) => {
        this.sectionsList = response;
        if(this.sectionsList.length > 0 && this.f.section.value !== ''){
          let foundObj = false;
          this.sectionsList.map(sec => {
            if(sec.id === this.f.section.value.id){
              foundObj = true;
            }
          });
          if(!foundObj){
            this.questionForm.patchValue({
              section: ''
            });
          }
        }else if(this.sectionsList.length === 0 && this.f.section.value !== ''){
          this.questionForm.patchValue({
            section: ''
          });
        }
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
        this.sectionsList = [];
        this.questionForm.patchValue({
          section: ''
        });
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.questionForm.controls; }

  onSubmit(e) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.questionForm.invalid) {
      return;
    }
    this.disableSubmit = true;
    const postObj = {
      questionId: this.questionId,
      question: this.f.question.value,
      class: this.f.class.value,
      stream: this.f.stream.value,
      subject: this.f.subject.value,
      topic: this.f.topic.value,
      section: this.f.section.value,
      video: this.f.video.value
    };

    const formData = new FormData();
    formData.append('upload', this.f.fileSource.value);
    formData.append('class', this.f.class.value.id);
    formData.append('stream', this.f.stream.value.id);
    formData.append('subject', this.f.subject.value.id);
    formData.append('topic', this.f.topic.value.id);
    formData.append('section', this.f.section.value.id);
    formData.append('video', this.f.video.value);
    formData.append('questionId', this.questionId);
    e.preventDefault();
    this.questionService.addNewQuestion(formData).subscribe(
      (response: any) => {
        Swal.fire(
          'Success',
          'Saved Successfully!',
          'success'
        );
        this.submitted = false;
        this.questionForm.reset();
        this.questionForm.markAsPristine();
        this.questionForm.markAsUntouched();
        this.disableSubmit = false;
        setTimeout(() => {
          this.router.navigate([`/`], { state: { currentPage: 'Questions' }});
        }, 100)
      }, (error) => {
        this.disableSubmit = false;
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getQuestionDetails(){
    this.questionService.getQuestion(this.questionId).subscribe(
      (response) => {
        this.questionForm.patchValue({
          class: response.class,
          stream: response.stream,
          subject: response.subject,
          topic: response.topic,
          section: response.section,
          video: response.video
        });
        this.imageSrc = `assets/uploads/${response.image}`;
        this.getAllStreams();
        this.getAllSubjects();
        this.getAllTopics();
        this.getAllSections();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  onFileChange(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.questionForm.patchValue({
      fileSource: file
    });
    this.questionForm.get('fileSource').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      //this.uploadImage();
    }
    reader.readAsDataURL(file)
  }

}
