import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare const $;

import { ClassService } from '../../_utils/class.service';
import { StreamService } from '../../_utils/stream.service';
import { SubjectService } from '../../_utils/subject.service';
import { TopicService } from '../../_utils/topic.service';
import { SectionService } from '../../_utils/section.service';
import { QuestionService } from '../../_utils/question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public currentTab: String = 'Classes';
  public isAllChecked: Boolean = false;
  public classList: Array<any>;
  public streamList: Array<any>;
  public subjectList: Array<any>;
  public topicList: Array<any>;
  public sectionList: Array<any>;
  public questionList: Array<any>;
  public checkedList: Array<any> = [];
  constructor(
    private classService: ClassService,
    private streamService: StreamService,
    private subjectService: SubjectService,
    private topicService: TopicService,
    private sectionService: SectionService,
    private questionService: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation().extras.state){
      this.currentTab = this.router.getCurrentNavigation().extras.state.currentPage;
    }
   }

   ngOnInit(): void {
    this.getAllClasses();
  }

  changeTab(tab){
    this.isAllChecked = false;
    this.currentTab = tab;
  }

  getAllClasses() {
    if ($.fn.DataTable.isDataTable('#classDatatables')) {
      $('#classDatatables').DataTable().destroy();
    }
    this.classService.getAllClasses().subscribe(
      (response) => {
        response.classes.map(res => res.checked = false);
        this.classList = response.classes;
        setTimeout(() => {
          const classTable = $('#classDatatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
              [10, 25, 50, -1],
              [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search records',
            },
            order: [],
            columnDefs: [
              { orderable: false, targets: [0] }
            ]
          });
        }, 1000);
        this.getAllStreams();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }
  getAllStreams() {
    if ($.fn.DataTable.isDataTable('#streamDatatables')) {
      $('#streamDatatables').DataTable().destroy();
    }
    this.streamService.getAllStreams().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.streamList = response;
        setTimeout(() => {
          const streamTable = $('#streamDatatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
              [10, 25, 50, -1],
              [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search records',
            },
            order: [],
            columnDefs: [
              { orderable: false, targets: [0] }
            ]
          });
        }, 1000);
        this.getAllSubjects();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }
  getAllSubjects() {
    if ($.fn.DataTable.isDataTable('#subjectDatatables')) {
      $('#subjectDatatables').DataTable().destroy();
    }
    this.subjectService.getAllSubjects().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.subjectList = response;
        setTimeout(() => {
          const streamTable = $('#subjectDatatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
              [10, 25, 50, -1],
              [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search records',
            },
            order: [],
            columnDefs: [
              { orderable: false, targets: [0] }
            ]
          });
        }, 1000);
        this.getAllTopics();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getAllTopics() {
    if ($.fn.DataTable.isDataTable('#topicDatatables')) {
      $('#topicDatatables').DataTable().destroy();
    }
    this.topicService.getAllTopics().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.topicList = response;
        setTimeout(() => {
          const topicTable = $('#topicDatatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
              [10, 25, 50, -1],
              [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search records',
            },
            order: [],
            columnDefs: [
              { orderable: false, targets: [0] }
            ]
          });
        }, 1000);
        this.getAllSections();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getAllSections() {
    if ($.fn.DataTable.isDataTable('#sectionDatatables')) {
      $('#sectionDatatables').DataTable().destroy();
    }
    this.sectionService.getAllSections().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.sectionList = response;
        setTimeout(() => {
          const sectionTable = $('#sectionDatatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
              [10, 25, 50, -1],
              [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search records',
            },
            order: [],
            columnDefs: [
              { orderable: false, targets: [0] }
            ]
          });
        }, 1000);
        this.getAllQuestions();
      },
      (error) => {
        Swal.fire('Oops...', error.error.message, 'error');
      }
    );
  }

  getAllQuestions() {
    if ($.fn.DataTable.isDataTable('#questionDatatables')) {
      $('#questionDatatables').DataTable().destroy();
    }
    this.questionService.getAllQuestions().subscribe(
      (response) => {
        response.map(res => res.checked = false);
        this.questionList = response;
        setTimeout(() => {
          const questionTable = $('#questionDatatables').DataTable({
            'pagingType': 'full_numbers',
            'lengthMenu': [
              [10, 25, 50, -1],
              [10, 25, 50, 'All']
            ],
            responsive: true,
            language: {
              search: '_INPUT_',
              searchPlaceholder: 'Search records',
            },
            order: [],
            columnDefs: [
              { orderable: false, targets: [0] }
            ]
          });
        }, 1000);
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
            this.getAllSections();
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
