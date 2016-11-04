import { Component, Inject, Input, OnInit }  from '@angular/core';
import { QuestionsGeneratorService }         from '../../services';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [ './quiz.component.css' ],	
})

export class QuizComponent implements OnInit {
    private _WAITING_TIME = 1250;

    private _question: string;
    private _options: string[];
    private _answerIndex: number;
    
    private _correctNum = 0;
    private _wrongNum = 0;

    constructor(private _questionsGeneratorService: QuestionsGeneratorService) { }

    public ngOnInit(): void {
        this._generateRiddle();
    }

    private _onOptionClick(optionIndex: number): void {
        optionIndex === this._answerIndex ? this._correctNum++ : this._wrongNum++;
        setTimeout(this._generateRiddle, this._WAITING_TIME);        
    }

    private _generateRiddle = () => {
        const riddle = this._questionsGeneratorService.generateTextRiddle();
        this._question = riddle.question;
        this._options = riddle.options;
        this._answerIndex = riddle.answerIndex;
    }
}
