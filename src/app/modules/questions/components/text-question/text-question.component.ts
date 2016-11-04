import { Component, Inject, Input, Output, EventEmitter }  from '@angular/core';

@Component({
    selector: 'text-question',
    templateUrl: './text-question.component.html',
    styleUrls: [ './text-question.component.css' ],	
})

export class TextQuestionComponent {
    @Input() question: string;
    @Input() options: string[];
    @Input() answerIndex: number;

    @Output() optionClick = new EventEmitter();
    
    private _cssClasses: string[] = [];

    constructor() { }

    public ngOnChanges(changes: any) {
        if (changes.options) {
            this._cssClasses = this.options.map((option): string => {                
                return 'option';
            });
        }
    }

    private _onOptionClick(option: string, index: number) {
        this._updateCssClasses(option, index);
        this.optionClick.emit(index);
    }

    private _updateCssClasses(selectedOption: string, index: number) {
        if (index !== this.answerIndex) {
            this._cssClasses[index] += ' wrong';
        } 

        this._cssClasses[this.answerIndex] += ' correct';
    }
}
