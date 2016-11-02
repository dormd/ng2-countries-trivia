import { NgModule }                    from '@angular/core';
import { SharedModule }                from '../shared';
import { TextQuestionComponent, 
         QuizComponent }               from './components';
import { QuestionsGeneratorService }   from './services';

const modules = [
    SharedModule
];

const components = [
    TextQuestionComponent,
    QuizComponent
];

const directives = [];

const pipes = [];

const providers = [
    QuestionsGeneratorService
];

const myExports = [
    QuizComponent,
];

@NgModule({
    imports: [
        ...modules
    ],
    exports: [ 
        ...myExports
    ],
    declarations: [ 
        ...components 
    ],
    providers: [
        ...providers
    ],
})
export class QuestionsModule { }
