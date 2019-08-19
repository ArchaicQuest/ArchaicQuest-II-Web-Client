import { AppState } from './app.state';
import { AppActionTypes, AppActions } from './app.actions';
import * as signalR from '@aspnet/signalr';

const intitalState: AppState = {
    connection: {},
};

export function addItemReducer(state: AppState = intitalState, action: AppActions) {
    switch (action.type) {
        case AppActionTypes.ConnectToServer: {
            return {
              ...state,
                connection: new signalR.HubConnection('http://localhost:57814/Hubs/game'),
            };
        }
        case AppActionTypes.ConnectToServerSuccess: {
            return {
                ...state,
                connection: action.payload,
            };
        }
        default:
            return state;
    }
}
