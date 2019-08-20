import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectFeature = (state: AppState) => state;


export const selectConnection = createSelector(
    selectFeature,
    (state: AppState) => state.appReducer.connected
);

export const selectData = createSelector(
    selectFeature,
    (state: AppState) => state.appReducer.data
);
