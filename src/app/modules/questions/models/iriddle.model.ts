import { RiddleType } from './riddle-type.model';

export interface IRiddle {
    type: RiddleType,
    question: string, 
    options: string[], 
    answerIndex: number
}