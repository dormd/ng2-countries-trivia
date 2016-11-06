import { NgModule }                    from '@angular/core';
import { GalleryModule }               from 'ng2-countries/src/app';

import { SharedModule }                from '../shared';
import { RiddleComponent, 
         QuizComponent }               from './components';
import { QuestionsGeneratorService }   from './services';

const modules = [
    SharedModule,
    GalleryModule
];

const components = [
    RiddleComponent,
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
