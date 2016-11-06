import { Component, Inject, Input, Output, EventEmitter }  from '@angular/core';
import { RiddleType } from '../../models';

@Component({
    selector: 'riddle',
    templateUrl: './riddle.component.html',
    styleUrls: [ './riddle.component.css' ],	
})

export class RiddleComponent {
    @Input() riddleType: RiddleType;
    @Input() question: string;
    @Input() options: string[];
    @Input() answerIndex: number;
 
    @Output() optionClick = new EventEmitter();
    
    private _cssClasses: string[] = [];
    private _riddleTypes = RiddleType;
    
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
