import { NgModule }                    from '@angular/core';
import { GalleryModule }               from 'ng2-countries/src/app';

import { SharedModule }                from '../shared';
import { RiddleComponent, 
         QuizComponent }               from './components';
import { SettingsModule }              from '../settings';
import { QuestionsGeneratorService }   from './services';
import { QuestionsRoutingModule }      from './questions-routing.module';

const modules = [
    SharedModule,
    GalleryModule,
    QuestionsRoutingModule,
    SettingsModule
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
