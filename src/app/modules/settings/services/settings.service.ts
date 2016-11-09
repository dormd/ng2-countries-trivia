import { Injectable } from '@angular/core';
import { Levels } from '../models';

@Injectable()
export class SettingsService {

    private _isFlagsOnly = false;
    private _level = Levels.Easy;

    constructor() {}

    public getIsFlagsOnly(): boolean {
        return this._isFlagsOnly;
    }

    public getLevel(): Levels {
        return this._level;
    }

    public setIsFlagsOnly(isFlagsOnly: boolean) {
        this._isFlagsOnly = isFlagsOnly;
    }

    public setLevel(level: Levels) {
        this._level = level;
    }
}
