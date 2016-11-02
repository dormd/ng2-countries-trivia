import { Injectable,
         Inject }         from '@angular/core';

import { COUNTRIES_DATA, 
         Countries, 
         ANTHEMS_DATA, 
         Anthems }        from '../../shared/models';

import * as _ from 'lodash';

@Injectable()
export class QuestionsGeneratorService {

    private _countriesKeys: string[];

    constructor(@Inject(COUNTRIES_DATA) private _countriesData: Countries,
                @Inject(ANTHEMS_DATA) private _anthemsData: Anthems) {

        this._countriesKeys = _.keys(this._countriesData);                
    }

    public getCapitalByCountryQuestion() {
        const questionA2 = this._getRandomAlpha2();
        const optionsA2s = this._getRandomAlpha2(4);

        const question = 'What is the capital of {{ questionA2 | a2ToCountry }}?';
        const answer = questionA2;  
        const options = optionsA2s.map((a2: string): string => {
            return '{{ questionA2 | a2ToCountry }}';
        });

        return { question, options, answer };
    }

    private _getRandomAlpha2(numOfRandoms = 1): string[] {
        return _.times(numOfRandoms, (): string => {
            const rand = Math.ceil(Math.random() * this._countriesKeys.length); 
            return this._countriesKeys[rand];
        });
    }
}
