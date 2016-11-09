import { Injectable } from '@angular/core';
import { Levels } from '../models';

@Injectable()
export class SettingsService {

    private _isOnlyFlags = false;
    private _level = Levels.Easy;

    constructor() {}

    public getIsOnlyFlags(): boolean {
        return this._isOnlyFlags;
    }

    public getLevel(): Levels {
        return this._level;
    }

    public setIsOnlyFlags(isOnlyFlags: boolean) {
        this._isOnlyFlags = isOnlyFlags;
    }

    public setLevel(level: Levels) {
        this._level = level;
    }
}
