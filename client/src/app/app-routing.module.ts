import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ClassesComponent } from './classes/classes.component';
import { TopicsComponent } from './topics/topics.component';
import { QuestionsComponent } from './questions/questions.component';
import { StreamComponent } from './stream/stream.component';
import { SubjectComponent } from './subject/subject.component';
import { SectionComponent } from './section/section.component';
import { LoginComponent } from './login/login.component';
import { StudentComponent } from './student/student.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

import { AuthGuardService } from './_helpers/auth-guard.service';
import { LoggedOutGuardSevice } from './_helpers/logged-out.guard.service';


const routes: Routes = [
  {path: '' , pathMatch: 'full' , component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [LoggedOutGuardSevice]},
  {path: 'student', component: StudentComponent, canActivate: [AuthGuardService]},
  {path: 'profile/:id', component: StudentProfileComponent, canActivate: [AuthGuardService]},
  {path: 'streams' , component: StreamComponent, canActivate: [AuthGuardService]},
  {path: 'streams/:id' , component: StreamComponent, canActivate: [AuthGuardService]},
  {path: 'subjects' , component: SubjectComponent, canActivate: [AuthGuardService]},
  {path: 'subjects/:id' , component: SubjectComponent, canActivate: [AuthGuardService]},
  {path: 'users' , component: UsersComponent},
  {path: 'users/:id' , component: UsersComponent, canActivate: [AuthGuardService]},
  {path: 'classes' , component: ClassesComponent, canActivate: [AuthGuardService]},
  {path: 'classes/:id' , component: ClassesComponent, canActivate: [AuthGuardService]},
  {path: 'topics' , component: TopicsComponent, canActivate: [AuthGuardService]},
  {path: 'topics/:id' , component: TopicsComponent, canActivate: [AuthGuardService]},
  {path: 'sections' , component: SectionComponent, canActivate: [AuthGuardService]},
  {path: 'sections/:id' , component: SectionComponent, canActivate: [AuthGuardService]},
  {path: 'questions' , component: QuestionsComponent, canActivate: [AuthGuardService]},
  {path: 'questions/:id' , component: QuestionsComponent, canActivate: [AuthGuardService]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
