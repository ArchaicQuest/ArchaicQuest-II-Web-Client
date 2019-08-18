import { Action } from '@ngrx/store';

export enum AppActionTypes {
    ConnectToServer = '[Server] Connect to server.',
    ConnectToServerSuccess = '[Server] Successfully Connected to server.',
}

export class ConnectToServer implements Action {
    readonly type = AppActionTypes.ConnectToServer;
}

export class ConnectToServerSuccess implements Action {
    readonly type = AppActionTypes.ConnectToServerSuccess;

    constructor(public payload: any) { }
}

export type AppActions =
    ConnectToServer | ConnectToServerSuccess;
