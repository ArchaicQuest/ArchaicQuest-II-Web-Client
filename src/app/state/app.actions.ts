import { Action } from '@ngrx/store';

export enum AppActionTypes {
    ConnectToServer = '[Server] Connect to server.',
    ConnectToServerSuccess = '[Server] Successfully Connected to server.',
    UpdateWindow = '[Client] Update Window',
    UpdateWindowSuccess = '[Server] Update Window Success',
}

export class ConnectToServer implements Action {
    readonly type = AppActionTypes.ConnectToServer;
}

export class ConnectToServerSuccess implements Action {
    readonly type = AppActionTypes.ConnectToServerSuccess;

    constructor(public payload: boolean) { }
}

export class UpdateWindow implements Action {
    readonly type = AppActionTypes.UpdateWindow;

    constructor(public payload: string) { }
}

export class UpdateWindowSuccess implements Action {
    readonly type = AppActionTypes.UpdateWindowSuccess;
}

export type AppActions =
    ConnectToServer | ConnectToServerSuccess | UpdateWindow;
