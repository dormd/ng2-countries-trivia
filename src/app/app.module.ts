import { NgModule }          from '@angular/core';

import { SharedModule,
         QuestionsModule }   from './modules';

import { AppRoutingModule }  from './app-routing.module';
import { SettingsComponent } from './components';

import { AppComponent }      from './app.component';

const modules = [
    SharedModule,
    QuestionsModule,
    AppRoutingModule
];

const components = [
    SettingsComponent,
    AppComponent
];

const directives = [];

const pipes = [];

const providers = [];

@NgModule({
    declarations: [
      ...components,
      ...directives,
      ...pipes
    ],
    imports: [
      ...modules
    ],
    providers: [
      ...providers
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
