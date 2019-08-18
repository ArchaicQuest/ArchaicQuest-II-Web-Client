import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map, switchMap, catchError } from 'rxjs/operators';
import { of, Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class AppEffects {
    // constructor(private actions$: Actions, private addItemService: ItemService) { }

    // @Effect()
    // loadItemTypes: Observable<Action> = this.actions$.pipe(
    //     ofType(AddItemActionTypes.GetItemTypes),
    //     mergeMap((action: GetItemTypes) =>
    //         this.addItemService.getItemTypes().pipe(
    //             map((itemTypes: ItemType[]) => (new GetItemTypesSuccess(itemTypes))),
    //             catchError(err => of(new GetItemTypesFail(err)))
    //         )
    //     )
    // );
}
