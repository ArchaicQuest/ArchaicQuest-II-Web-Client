import { AppState } from './app.state';
import { AppActionTypes, AppActions } from './app.actions';

const intitalState: AppState = {
    connected: false,
    data: 'test'
};

export function appReducer(state: AppState = intitalState, action: AppActions) {
    switch (action.type) {
        case AppActionTypes.ConnectToServer: {
            return {
                ...state,
            };
        }
        case AppActionTypes.ConnectToServerSuccess: {
            return {
                ...state,
                connected: action.payload,
            };
        }
        case AppActionTypes.UpdateWindow: {

            return {
                ...state,
                data: action.payload,
            };
        }
        default:
            return state;
    }
}
