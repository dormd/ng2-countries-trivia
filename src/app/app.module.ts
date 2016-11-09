import { NgModule }          from '@angular/core';

import { SharedModule,
         SettingsModule,
         QuestionsModule }   from './modules';

import { AppRoutingModule }  from './app-routing.module';

import { AppComponent }      from './app.component';

const modules = [
    SharedModule,
    QuestionsModule,
    SettingsModule,
    AppRoutingModule
];

const components = [
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
