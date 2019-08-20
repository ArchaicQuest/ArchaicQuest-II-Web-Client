import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { AppService } from '../app.service';
import { AppActionTypes } from './app.actions';

@Injectable()
export class AppEffects {
    constructor(private actions$: Actions, private addItemService: AppService) { }

    // @Effect()
    // sendToServer: Observable<Action> = this.actions$.pipe(
    //     ofType(AppActionTypes.sendToServer).switchMap( () => {
    //         console.log('yep, doing the anonymous auth')
    //         return Observable.fromPromise(<Promise<any>>firebase.auth().signInAnonymously())
    //           .switchMap( (result) => {

    //             // Any of these will work

    //              return Observable.of({})
    //              return (<ObservableInput<any>>{});
    //              return null;
    //           });
    //       })
    //     mergeMap((action: string) =>
    //         this.addItemService.sendToServer(action).pipe(
    //             map((itemTypes: ItemType[]) => (new GetItemTypesSuccess(itemTypes))),
    //             catchError(err => of(new GetItemTypesFail(err)))
    //         )
    //     )
    // );

    // @Effect({dispatch: false}) anonymousAuth$ = this.actions$
    // .ofType('BEGIN_ANONYMOUS_AUTH')
    // .switchMap( () => {
    //   console.log('yep, doing the anonymous auth')
    //   return Observable.fromPromise(<Promise<any>>firebase.auth().signInAnonymously())
    //     .switchMap( (result) => {

    //       // Any of these will work

    //        return Observable.of({})
    //        return (<ObservableInput<any>>{});
    //        return null;
    //     });
    // })
}
