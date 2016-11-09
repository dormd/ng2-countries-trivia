import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizComponent }     from './modules/questions';
import { SettingsComponent }     from './components'; 

const routes: Routes = [
    { path: '', component: SettingsComponent },
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule { }
