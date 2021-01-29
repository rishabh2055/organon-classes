import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare const $;

import { ClassService } from '../../_utils/class.service';
import { StreamService } from '../../_utils/stream.service';
import { SubjectService } from '../../_utils/subject.service';
import { TopicService } from '../../_utils/topic.service';
import { SectionService } from '../../_utils/section.service';
import { QuestionService } from '../../_utils/question.service';
import { UserService } from '../../_utils/user.service';
import { AuthService } from '../../_utils/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public currentTab: String = 'Classes';
  public isAllChecked: Boolean = false;
  public classList: Array<any>;
  public streamList: Array<any>;
  public subjectList: Array<any>;
  public topicList: Array<any>;
  public sectionList: Array<any>;
  public questionList: Array<any>;
  public userList: Array<any>;
  public checkedList: Array<any> = [];
  public dtClassOptions: DataTables.Settings = {};
  public dtStreamOptions: DataTables.Settings = {};
  public dtSubjectOptions: DataTables.Settings = {};
  public dtTopicOptions: DataTables.Settings = {};
  public dtQuestionOptions: DataTables.Settings = {};
  public dtUserOptions: DataTables.Settings = {};
  public dtSectionOptions: DataTables.Settings = {};
  public dtClassTrigger: Subject<any> = new Subject<any>();
  public dtStreamTrigger: Subject<any> = new Subject<any>();
  public dtSubjectTrigger: Subject<any> = new Subject<any>();
  public dtSectionTrigger: Subject<any> = new Subject<any>();
  public dtTopicTrigger: Subject<any> = new Subject<any>();
  public dtQuestionTrigger: Subject<any> = new Subject<any>();
  public dtUserTrigger: Subject<any> = new Subject<any>();
  public updateTableOnly: Boolean = false;
  constructor(
    private classService: ClassService,
    private streamService: StreamService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private sectionService: SectionService,
    private questionService: QuestionService,
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if(this.authService.getUser().role === 'Student'){
      this.router.navigate([`student`]);
    }
    if (this.router.getCurrentNavigation() !== null && this.router.getCurrentNavigation().extras.state){
      this.currentTab = this.router.getCurrentNavigation().extras.state.currentPage;
    }
   }

   ngOnInit(): void {
    this.dtClassOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtStreamOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtSubjectOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtQuestionOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtSectionOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtTopicOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtUserOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.getAllClasses();
  }

  changeTab(tab){
    this.isAllChecked = false;
    this.currentTab = tab;
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtClassTrigger.unsubscribe();
    this.dtStreamTrigger.unsubscribe();
    this.dtSubjectTrigger.unsubscribe();
    this.dtTopicTrigger.unsubscribe();
    this.dtSectionTrigger.unsubscribe();
    this.dtQuestionTrigger.unsubscribe();
    this.dtUserTrigger.unsubscribe();
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe(
      (response) => {
        response.classes.map(res => res.checked = false);
        this.classList = response.classes;
        this.dtClassTrigger.next();
        this.getAllStreams();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }
  getAllStreams() {
    this.streamService.getAllStreams().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.streamList = response;
        this.dtStreamTrigger.next();
        this.getAllSubjects();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }
  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.subjectList = response;
        this.dtSubjectTrigger.next();
        this.getAllTopics();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getAllTopics() {
    this.topicService.getAllTopics().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.topicList = response;
        this.dtTopicTrigger.next();
        this.getAllSections();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getAllSections() {
    this.sectionService.getAllSections().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.sectionList = response;
        this.dtSectionTrigger.next();
        this.getAllQuestions();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.questionList = response;
        this.dtQuestionTrigger.next();
        this.getAllUsers();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.userList = response;
        this.dtUserTrigger.next();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  editClass(classes){
    this.router.navigate([`classes/${classes.id}`]);
  }

  deleteClass(classes){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.classService.deleteClass(classes.id).subscribe(
          (response: any) => {
            Swal.fire(
              'Success',
              'Deleted Successfully!',
              'success'
            );
            this.dtClassTrigger.unsubscribe();
            this.getAllClasses();
          }, (error) => {
            Swal.fire('Oops...', error.error.message, 'error');
          }
        );
      }
    });
  }

  editStream(stream){
    this.router.navigate([`streams/${stream.id}`]);
  }

  deleteStream(stream){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.streamService.deleteStream(stream.id).subscribe(
          (response: any) => {
            Swal.fire(
              'Success',
              'Deleted Successfully!',
              'success'
            );
            this.dtStreamTrigger.unsubscribe();
            this.getAllStreams();
          }, (error) => {
            Swal.fire('Oops...', error.error.message, 'error');
          }
        );
      }
    });
  }

  editSubject(sub){
    this.router.navigate([`subjects/${sub.id}`]);
  }

  deleteSubject(sub){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.deleteSubject(sub.id).subscribe(
          (response: any) => {
            Swal.fire(
              'Success',
              'Deleted Successfully!',
              'success'
            );
            this.dtSubjectTrigger.unsubscribe();
            this.getAllSubjects();
          }, (error) => {
            Swal.fire('Oops...', error.error.message, 'error');
          }
        );
      }
    });
  }

  editTopic(topic){
    this.router.navigate([`topics/${topic.id}`]);
  }

  deleteTopic(topic){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.topicService.deleteTopic(topic.id).subscribe(
          (response: any) => {
            Swal.fire(
              'Success',
              'Deleted Successfully!',
              'success'
            );
            this.dtTopicTrigger.unsubscribe();
            this.getAllTopics();
          }, (error) => {
            Swal.fire('Oops...', error.error.message, 'error');
          }
        );
      }
    });
  }

  editSection(sec){
    this.router.navigate([`sections/${sec.id}`]);
  }

  deleteSection(sec){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sectionService.deleteSection(sec.id).subscribe(
          (response: any) => {
            Swal.fire(
              'Success',
              'Deleted Successfully!',
              'success'
            );
            this.dtSectionTrigger.unsubscribe();
            this.getAllSections();
          }, (error) => {
            Swal.fire('Oops...', error.error.message, 'error');
          }
        );
      }
    });
  }

  editQuestion(que){
    this.router.navigate([`questions/${que.id}`]);
  }

  deleteQuestion(que){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.deleteQuestion(que.id).subscribe(
          (response: any) => {
            Swal.fire(
              'Success',
              'Deleted Successfully!',
              'success'
            );
            this.dtQuestionTrigger.unsubscribe();
            this.getAllQuestions();
          }, (error) => {
            Swal.fire('Oops...', error.error.message, 'error');
          }
        );
      }
    });
  }

  editUser(user){
    this.router.navigate([`users/${user.id}`]);
  }

  deleteUser(user){
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id).subscribe(
          (response: any) => {
            Swal.fire(
              'Success',
              'Deleted Successfully!',
              'success'
            );
            this.dtUserTrigger.unsubscribe();
            this.getAllUsers();
          }, (error) => {
            Swal.fire('Oops...', error.error.message, 'error');
          }
        );
      }
    });
  }

  checkuncheckall(data){
    this.isAllChecked = !this.isAllChecked;
    if(this.isAllChecked){
      data.map(obj => obj.checked = true);
      this.checkedList = data;
    }else{
      data.map(obj => obj.checked = false);
      this.checkedList = [];
    }
  }

  onChecked(data, list){
    data.checked = !data.checked;
    if(data.checked){
      this.checkedList.push(data);
    }else{
      this.checkedList.splice(this.checkedList.indexOf(data), 1);
    }
    if(this.checkedList.length === list.length){
      this.isAllChecked = true;
    }else{
      this.isAllChecked = false;
    }
  }
}
