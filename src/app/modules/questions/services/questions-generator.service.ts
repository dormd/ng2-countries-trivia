import { Injectable,
         Inject }         from '@angular/core';

import { COUNTRIES_DATA, 
         Countries, 
         ANTHEMS_DATA, 
         Anthems }        from '../../shared/models';

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

    private _countriesKeys: string[];

    constructor(@Inject(COUNTRIES_DATA) private _countriesData: Countries,
                @Inject(ANTHEMS_DATA) private _anthemsData: Anthems) {

        this._countriesKeys = _.keys(this._countriesData);                
    }

    public getCapitalByCountryQuestion() {
        const questionA2 = this._getRandomAlpha2()[0];
        const optionsA2s = this._getRandomAlpha2(3);
        optionsA2s.push(questionA2);

        const questionCountryName = this._countriesData[questionA2].name.common;
        const answer = this._countriesData[questionA2].capital;  
        const question = `What is the capital of ${ questionCountryName }?`;
        
        const options = optionsA2s.map((a2: string): string => {
            return this._countriesData[a2].capital;
        });

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
