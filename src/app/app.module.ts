import { NgModule }          from '@angular/core';

import { SharedModule,
         QuestionsModule }    from './modules';
 
import { AppComponent }      from './app.component';

const modules = [
    SharedModule,
    QuestionsModule,
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
