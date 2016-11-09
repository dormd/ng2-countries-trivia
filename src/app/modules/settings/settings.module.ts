import { NgModule }                   from '@angular/core';
import { SharedModule }               from '../shared';
import { SettingsComponent }          from './components';
import { SettingsService }            from './services';
import { SettingsRoutingModule }      from './settings-routing.module';

const modules = [
    SharedModule,
    SettingsRoutingModule
];

const components = [
    SettingsComponent
];

const directives = [];

const pipes = [];

const providers = [
    SettingsService
];

const myExports = [
    SettingsComponent,
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
export class SettingsModule { }
