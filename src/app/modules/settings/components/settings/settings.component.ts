import { Component, Input, Output, EventEmitter }  from '@angular/core';
import { Router } from '@angular/router';
import { Levels, IQuizQueryParams } from '../../models';
import { SettingsService } from '../../services';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: [ './settings.component.css' ],	
})

export class SettingsComponent {
    private _levels = Levels;
    private _isFlagsOnlyRiddles: boolean;
    private _level: Levels;
    
    constructor(private _router: Router,
                private _settingsService: SettingsService) { }

    private _onStartClick() {
        this._settingsService.setIsFlagsOnly(this._isFlagsOnlyRiddles);
        this._settingsService.setLevel(this._level);

        this._router.navigate(['/trivia']);
    }    
}
