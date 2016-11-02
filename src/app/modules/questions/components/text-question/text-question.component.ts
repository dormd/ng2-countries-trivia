import { Component, Inject, Input, Output, EventEmitter }  from '@angular/core';

@Component({
    selector: 'text-question',
    templateUrl: './text-question.component.html',
    styleUrls: [ './text-question.component.css' ],	
})

export class TextQuestionComponent {
    @Input() question: string;
    @Input() options: string[];
    // @Input() answer: string;

    @Output() optionClick = new EventEmitter();
    
    constructor() { }

    private _onOptionClick(option: string) {
        this.optionClick.emit(option);
    }
}
