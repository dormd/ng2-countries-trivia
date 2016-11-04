import { Injectable,
         Inject }         from '@angular/core';

import { COUNTRIES_DATA, 
         Countries, 
         ANTHEMS_DATA, 
         Anthems }        from '../../shared/models';

import { CommaStylePipe } from 'ng2-pipe';

import * as _ from 'lodash';

interface IStrToStrFunc { 
    (string): string 
}

export interface IRiddle {
    question: string, 
    options: string[], 
    answer: string
}

export interface IRiddleGenerator {
    (): IRiddle 
}

@Injectable()
export class QuestionsGeneratorService {

    private _textQuestionsGenerators: IRiddleGenerator[];
    private _countriesKeys: string[];
    private _NUM_OF_OPTIONS = 4;

    constructor(@Inject(COUNTRIES_DATA) private _countriesData: Countries,
                @Inject(ANTHEMS_DATA) private _anthemsData: Anthems) {

        this._countriesKeys = _.keys(this._countriesData); 

        this._textQuestionsGenerators = [
            this._generateCapitalByCountryQuestion,
            this._generateCountryByCapitalQuestion,
            this._generatePopulationByCountryQuestion,
            this._generateCountryByPopulationQuestion
        ];             
    }

    public generateTextRiddle() {
        const generatorIndex = this._getRandNum(this._textQuestionsGenerators.length); 
        const generator = this._textQuestionsGenerators[generatorIndex];
        const riddle = generator();

        return riddle;       
    }

    private _generateCapitalByCountryQuestion = (): IRiddle => {
        console.log(this);
        const questionFunc = (a2: string): string => {
            const countryName = this._countriesData[a2].name.common;
            return `What is the capital of ${ countryName }?`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._countriesData[a2].capital;
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generateCountryByCapitalQuestion = (): IRiddle => {
        console.log(this);

        const questionFunc = (a2: string): string => {
            const capital = this._countriesData[a2].capital;
            return `${ capital } is the capital of...`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._countriesData[a2].name.common;
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generatePopulationByCountryQuestion = (): IRiddle => {
        console.log(this);

        const questionFunc = (a2: string): string => {
            const country = this._countriesData[a2].name.common;
            return `What is the population of ${ country }?`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._countriesData[a2].population.count.toString();
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generateCountryByPopulationQuestion = (): IRiddle => {
        console.log(this);

        const questionFunc = (a2: string): string => {
            const populationCount = this._countriesData[a2].population.count;
            return `Which country has ${ populationCount } peopls?`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._countriesData[a2].name.common;
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generateTextRiddleHelper(generateQuestion: IStrToStrFunc, generateOption: IStrToStrFunc): IRiddle {
        const optionsA2s = this._getRandomAlpha2(this._NUM_OF_OPTIONS);
        const questionIndex = this._getRandNum(this._NUM_OF_OPTIONS);
        const questionA2: string = optionsA2s[questionIndex];
        
        const question = generateQuestion(questionA2);
        const options = optionsA2s.map(generateOption);
        const answer = options[questionIndex];
        
        return { question, options, answer };
    }

    private _getRandomAlpha2(numOfRandoms = 1): string[] {
        return _.times(numOfRandoms, (): string => {
            const rand = this._getRandNum(this._countriesKeys.length); 
            return this._countriesKeys[rand];
        });
    }

    private _getRandNum(max: number): number {
        return Math.floor(Math.random() * max); 
    }
}
