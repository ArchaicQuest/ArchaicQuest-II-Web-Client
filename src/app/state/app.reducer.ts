import { AppState } from './app.state';
import { AppActionTypes, AppActions } from './app.actions';

const intitalState: AppState = {
    connection: null,
};

export function addItemReducer(state: AppState = intitalState, action: AppActions) {
    switch (action.type) {
        case AppActionTypes.ConnectToServer: {
            return {
                ...state,
                loading: true
            };
        }
        case AppActionTypes.ConnectToServerSuccess: {
            return {
                ...state,
                connection: action.payload,
                loading: false
            };
        }
        default:
            return {
                ...state,
            };
    }
}
