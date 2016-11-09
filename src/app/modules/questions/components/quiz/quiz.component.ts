import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsGeneratorService } from '../../services';
import { IRiddle } from '../../models';
import { SettingsService, Levels, IQuizQueryParams } from '../../../settings';

@Component({
    selector: 'quiz',
    templateUrl: './quiz.component.html',
    styleUrls: [ './quiz.component.css' ],	
})

export class QuizComponent implements OnInit {
    private _WAITING_TIME = 1250;

    private _riddle: IRiddle;
    private _level: Levels;    
    private _isFlagsOnly: boolean;

    private _correctNum = 0;
    private _wrongNum = 0;

    constructor(private _route: ActivatedRoute,
                private _questionsGeneratorService: QuestionsGeneratorService,
                private _settingsService: SettingsService) { }
    
    public ngOnInit(): void {
        this._level = this._settingsService.getLevel() || Levels.Easy;
        this._isFlagsOnly = this._settingsService.getIsFlagsOnly() || false;

        this._generateRiddle();
    }

    private _onOptionClick(optionIndex: number): void {
        optionIndex === this._riddle.answerIndex ? this._correctNum++ : this._wrongNum++;
        setTimeout(this._generateRiddle, this._WAITING_TIME);        
    }

    private _generateRiddle = (): void => {
        this._riddle = this._questionsGeneratorService.generateRiddle(this._isFlagsOnly);
    }
}
