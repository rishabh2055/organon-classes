import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_utils/auth.service';
import { TopicService } from '../_utils/topic.service';
import { SubjectService } from '../_utils/subject.service';
import { SectionService } from '../_utils/section.service';
import { QuestionService } from '../_utils/question.service';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @ViewChild('dropdownEle') dropdownEle;
  public studentForm: FormGroup;
  public submitted = false;
  public disableSubmit: boolean = false;
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
  public subjectsList: Array<any> = [];
  public topicsList: Array<any> = [];
  public sectionsList: Array<any> = [];
  public questionsList: Array<any> = [];
  public userDetails: any;
  public questionImageSrc: String;
  public questionVideoSrc: SafeUrl;
  public disabledField: Boolean = true;
  public showQuestionDetails: Boolean = false;
  public sectionValue: any = {};
  public activeQuestionIndex: any = 0;
  public nextBtnActive: Boolean = true;
  public prevBtnActive: Boolean = false;
  public selectedTopic: any = {};
  public isCollapsed = true;
  public showBackBtn: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private topicService: TopicService,
    private subjectService: SubjectService,
    private sectionService: SectionService,
    private questionService: QuestionService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      class: [{value: null, disabled: this.disabledField}],
      stream: [{value: null, disabled: this.disabledField}],
      subject: ['', Validators.required],
      topic: ['', Validators.required]
    });
    this.getAuthenticationDetails();
  }

  // convenience getter for easy access to form fields
  get f() { return this.studentForm.controls; }

  checkDropdownPosition(e){
    const elem = e.currentTarget;
    const bounding = elem.getBoundingClientRect();
    const heightDiff = window.innerHeight - bounding.bottom;
    if(heightDiff <= 50){
      setTimeout(() => {
        elem.querySelector('.ngx-dropdown-container .ngx-dropdown-list-container').style.bottom = '45px';
        elem.querySelector('.ngx-dropdown-container .ngx-dropdown-list-container').style.width = 'max-content';
      })
    }
  }

  onBackBtnHover(e, flag){
    const elem = e.currentTarget;
    if(flag == 'Enter'){
      elem.style.left = '-3px';
    }else{
      elem.style.left = '-57px';
    }
  }

  goBack(){
    this.showQuestionDetails = false;
    this.showBackBtn = false;
  }

  getAllTopics() {
    this.topicService.getAllTopicListByClassAndStream(this.userDetails.studentDetails).subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.topicsList = response;
      },
      (error) => {
        Swal.fire('Oops...', "Something went wrong !! Please contact with support.", 'error');
      }
    );
  }

  getAllSubjects() {
    this.subjectService.getAllSubjectList(this.userDetails.studentDetails.stream).subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.subjectsList = response;
      },
      (error) => {
        Swal.fire('Oops...', "Session is expired !! Please login again.", 'error');
      }
    );
  }

  getAllSections(e) {
    this.sectionService.getAllSectionList(e.value).subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.sectionsList = response;
        if(!this.showQuestionDetails){
          this.sectionValue = this.sectionsList[0];
          this.getAllQuestions();
        }
      },
      (error) => {
        Swal.fire('Oops...', "Something went wrong !! Please contact with support.", 'error');
      }
    );
  }

  getAllQuestionListByClassAndStream() {
    this.questionService.getAllQuestionListByClassAndStream(this.userDetails.studentDetails).subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.questionsList = response;
        this.questionImageSrc = `ftp/uploads/${this.questionsList[0].image}`;
      },
      (error) => {
        Swal.fire('Oops...', "Something went wrong !! Please contact with support.", 'error');
      }
    );
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.studentForm.invalid) {
      return;
    }
    this.disableSubmit = false;
    this.selectedTopic = this.f.topic.value;
    this.getAllSections(this.f.topic);
  }
  getAllQuestions() {
    const postData = {
      class: this.f.class.value.id,
      stream: this.f.stream.value.id,
      subject: this.f.subject.value.id,
      topic: this.selectedTopic,
      section: this.sectionValue
    }
    this.questionService.getAllQuestionList(postData).subscribe(
      (response) => {
        this.questionsList = [];
        this.questionImageSrc = '';
        this.questionVideoSrc = '';
        if(response.length === 0){
          Swal.fire('Oops...', "No questions found ! Please change your filter.", 'error');
        }else{
          this.questionsList = response;
          this.questionImageSrc = `ftp/uploads/${this.questionsList[0].image}`;
          const tempStr = this.questionsList[0].video.split('/');
          this.questionVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.questionsList[0].video);
          this.showQuestionDetails = true;
          this.showBackBtn = true;
        }
        if(this.questionsList.length > 1){
          this.nextBtnActive = true;
        }else{
          this.nextBtnActive = false;
        }
      },
      (error) => {
        Swal.fire('Oops...', "Something went wrong !! Please contact with support.", 'error');
      }
    );
  }

  goToQuestion(index){
    if(this.questionsList[index]){
      this.activeQuestionIndex = index;
      this.questionImageSrc = `ftp/uploads/${this.questionsList[index].image}`;
      const tempStr = this.questionsList[index].video.split('/');
      this.questionVideoSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.questionsList[index].video);
      this.showQuestionDetails = true;
      if(this.questionsList[index+1]){
        this.nextBtnActive = true;
      }else{
        this.nextBtnActive = false;
      }
      if(this.questionsList[index-1]){
        this.prevBtnActive = true;
      }else{
        this.prevBtnActive = false;
      }
    }
  }
  getAuthenticationDetails(){
    this.userDetails = this.authService.getUser();
    this.studentForm.patchValue({
      class: this.userDetails.studentDetails.class.name,
      stream: this.userDetails.studentDetails.stream.name
    })
    this.getAllSubjects();
  }

}
