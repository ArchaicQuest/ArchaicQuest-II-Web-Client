import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AppService } from '../app.service';
import { AppActionTypes, SendToServerSuccess } from './app.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private addItemService: AppService) { }

    @Effect()
    sendToServer$: Observable<Action> = this.actions$.pipe(
        ofType(AppActionTypes.sendToServer), switchMap(x => {
            console.log('yep', x);
            this.addItemService.sendToServer(x);
            return of(new SendToServerSuccess());
        }));


}
