import { Component, Inject, Input, OnInit } from '@angular/core';
import { QuestionsGeneratorService } from '../../services';
import { IRiddle } from '../../models';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [ './quiz.component.css' ],	
})

export class QuizComponent implements OnInit {
    private _WAITING_TIME = 1250;

    private _riddle: IRiddle;
    private isOnlyFlagRiddles = false;

    private _correctNum = 0;
    private _wrongNum = 0;

    constructor(private _questionsGeneratorService: QuestionsGeneratorService) { }

    public ngOnInit(): void {
        this._generateRiddle();
    }

    private _onOptionClick(optionIndex: number): void {
        optionIndex === this._riddle.answerIndex ? this._correctNum++ : this._wrongNum++;
        setTimeout(this._generateRiddle, this._WAITING_TIME);        
    }

    private _generateRiddle = (): void => {
        console.log(this.isOnlyFlagRiddles);
        this._riddle = this._questionsGeneratorService.generateRiddle(this.isOnlyFlagRiddles);
    }
}
