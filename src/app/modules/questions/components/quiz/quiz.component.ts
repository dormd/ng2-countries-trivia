import { Component, Inject, Input, OnInit }  from '@angular/core';
import { QuestionsGeneratorService }         from '../../services';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [ './quiz.component.css' ],	
})

export class QuizComponent implements OnInit {
    private question: string;
    private options: string[];
    private answer: string;
    

    constructor(private _questionsGeneratorService: QuestionsGeneratorService) { }

    public ngOnInit(): void {
        const riddle = this._questionsGeneratorService.getCapitalByCountryQuestion();
        this.question = riddle.question;
        this.options = riddle.options;
        this.answer = riddle.answer;
    }
}
