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

import { AuthGuardService } from './_helpers/auth-guard.service';
import { LoggedOutGuardSevice } from './_helpers/logged-out.guard.service';


const routes: Routes = [
  {path: '' , pathMatch: 'full' , component: DashboardComponent},
  {path: 'streams' , component: StreamComponent},
  {path: 'streams/:id' , component: StreamComponent},
  {path: 'subjects' , component: SubjectComponent},
  {path: 'subjects/:id' , component: SubjectComponent},
  {path: 'users' , component: UsersComponent},
  {path: 'users/:id' , component: UsersComponent},
  {path: 'classes' , component: ClassesComponent},
  {path: 'classes/:id' , component: ClassesComponent},
  {path: 'topics' , component: TopicsComponent},
  {path: 'topics/:id' , component: TopicsComponent},
  {path: 'sections' , component: SectionComponent},
  {path: 'sections/:id' , component: SectionComponent},
  {path: 'questions' , component: QuestionsComponent},
  {path: 'questions/:id' , component: QuestionsComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
