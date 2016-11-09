import { Levels } from './levels.model';

export interface IQuizQueryParams {
    level: Levels;
    isFlagsOnly: boolean;
}