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

interface ICalcAnswerIndexFunc {
    (optionsA2s: string[]): number
}

export interface IRiddle {
    question: string, 
    options: string[], 
    answerIndex: number
}

export interface IRiddleGenerator {
    (): IRiddle 
}

@Injectable()
export class QuestionsGeneratorService {

    private _riddlesGenrators: IRiddleGenerator[];
    private _countriesKeys: string[];
    private _NUM_OF_OPTIONS = 4;
    // private _CONTINENTS = []
    private _commaStylePipe = new CommaStylePipe();

    constructor(@Inject(COUNTRIES_DATA) private _countriesData: Countries,
                @Inject(ANTHEMS_DATA) private _anthemsData: Anthems) {

        this._countriesKeys = _.keys(this._countriesData); 

        const regularTextRiddlesGenerators = [
            this._generateCapitalByCountryQuestion,
            this._generateCountryByCapitalQuestion,
            this._generatePopulationByCountryQuestion,
            this._generateCountryByPopulationQuestion,
            this._generateAreaByCountryQuestion,
            this._generateCountryByAreaQuestion,
        ];

        const muchRiddleGenerators = [
            this._generateMuchBiggerCountryByAreaQuestion,
            this._generateMuchLittleCountryByAreaQuestion,
            this._generateMuchBiggerCountryByPopulationQuestion,
            this._generateMuchLittleCountryByPopulationQuestion,
        ];

        this._riddlesGenrators = [
            ...regularTextRiddlesGenerators,
            ...muchRiddleGenerators,
        ]     
    }

    public generateTextRiddle() {
        const generatorIndex = this._getRandNum(this._riddlesGenrators.length); 
        const generator = this._riddlesGenrators[generatorIndex];
        const riddle = generator();

        return riddle;       
    }

    private _generateCapitalByCountryQuestion = (): IRiddle => {
        
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

        const questionFunc = (a2: string): string => {
            const capital = this._countriesData[a2].capital;
            return `${ capital } is the capital of`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._countriesData[a2].name.common;
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generatePopulationByCountryQuestion = (): IRiddle => {

        const questionFunc = (a2: string): string => {
            const country = this._countriesData[a2].name.common;
            return `What is the population of ${ country }?`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._commaStylePipe.transform(this._countriesData[a2].population.count, []).toString();
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generateCountryByPopulationQuestion = (): IRiddle => {

        const questionFunc = (a2: string): string => {
            const populationCount = this._commaStylePipe.transform(this._countriesData[a2].population.count, []);
            return `Which country has ${ populationCount } people?`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._countriesData[a2].name.common;
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generateAreaByCountryQuestion = (): IRiddle => {

        const questionFunc = (a2: string): string => {
            const country = this._countriesData[a2].name.common;
            return `What is the area of ${ country }?`;
        };
        
        const optionFunc = (a2: string): string => {
            const area = this._commaStylePipe.transform(this._countriesData[a2].geo.area, []);
            return `${ area } km x km`;
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generateCountryByAreaQuestion = (): IRiddle => {

        const questionFunc = (a2: string): string => {
            const area = this._commaStylePipe.transform(this._countriesData[a2].geo.area, []);
            return `Which country has ${ area } km x km?`;
        };
        
        const optionFunc = (a2: string): string => {
            return this._countriesData[a2].name.common;
        };

        return this._generateTextRiddleHelper(questionFunc, optionFunc);
    }

    private _generateMuchBiggerCountryByAreaQuestion = (): IRiddle => {

        const calcAnswerIndexFunc = (optionsA2s: string[]): number => {
            const answer = _.maxBy(optionsA2s, (a2: string): number => {
                return this._countriesData[a2].geo.area;
            });

            return optionsA2s.indexOf(answer);
        };

        const question = 'Which country has the largest area?';
        return this._generateMostRiddleHelper(question, calcAnswerIndexFunc);
    }

    private _generateMuchLittleCountryByAreaQuestion = (): IRiddle => {

        const calcAnswerIndexFunc = (optionsA2s: string[]): number => {
            const answer = _.minBy(optionsA2s, (a2: string): number => {
                return this._countriesData[a2].geo.area;
            });

            return optionsA2s.indexOf(answer);
        };

        const question = 'Which country has the smallest area?';
        return this._generateMostRiddleHelper(question, calcAnswerIndexFunc);
    }

    private _generateMuchBiggerCountryByPopulationQuestion = (): IRiddle => {

        const calcAnswerIndexFunc = (optionsA2s: string[]): number => {
            const answer = _.maxBy(optionsA2s, (a2: string): number => {
                return this._countriesData[a2].population.count;
            });

            return optionsA2s.indexOf(answer);
        };

        const question = 'Which country has the largest population?';
        return this._generateMostRiddleHelper(question, calcAnswerIndexFunc);
    }

    private _generateMuchLittleCountryByPopulationQuestion = (): IRiddle => {

        const calcAnswerIndexFunc = (optionsA2s: string[]): number => {
            const answer = _.minBy(optionsA2s, (a2: string): number => {
                return this._countriesData[a2].population.count;
            });

            return optionsA2s.indexOf(answer);
        };

        const question = 'Which country has the smallest population?';
        return this._generateMostRiddleHelper(question, calcAnswerIndexFunc);
    }

    private _generateMostRiddleHelper = (question: string, calcAnswerIndexFunc: ICalcAnswerIndexFunc): IRiddle => {

        const optionsA2s = this._getRandomAlpha2(this._NUM_OF_OPTIONS);
        const options = optionsA2s.map((a2: string): string => {
            return this._countriesData[a2].name.common;
        });

        const answerIndex = calcAnswerIndexFunc(optionsA2s);
        return { question, options, answerIndex };
    }

    // private _generateContinentByCountryQuestion = (): IRiddle => {
    //     const a2 = this._getRandomAlpha2()[0];
    //     const country = this._countriesData[a2].name.common;
    //     const question = `What is the continent of ${ country }?`;

    //     const questionIndex = this._getRandNum(this._NUM_OF_OPTIONS);
    //     const options = optionsA2s.map(generateOption);
    //     const answer = options[questionIndex];
        
    //     return { question, options, answer };
    // }

    private _generateTextRiddleHelper(generateQuestion: IStrToStrFunc, generateOption: IStrToStrFunc): IRiddle {
        const optionsA2s = this._getRandomAlpha2(this._NUM_OF_OPTIONS);
        const questionIndex = this._getRandNum(this._NUM_OF_OPTIONS);
        const questionA2 = optionsA2s[questionIndex];
        
        const question = generateQuestion(questionA2);
        const options = optionsA2s.map(generateOption);
        const answerIndex = questionIndex;
        
        return { question, options, answerIndex };
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
