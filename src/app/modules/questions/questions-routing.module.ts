import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './components';

@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'trivia', component: QuizComponent }
    ])
  ],
  exports: [
        RouterModule
  ]
})
export class QuestionsRoutingModule { }