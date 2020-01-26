import { Action } from '@ngrx/store';

export enum AppActionTypes {
    ConnectToServer = '[Server] Connect to server.',
    ConnectToServerSuccess = '[Server] Successfully Connected to server.',
    UpdateWindow = '[Client] Update Window',
    UpdateWindowSuccess = '[Server] Update Window Success',
    sendToServer = '[Client] Send to server',
    sendToServerSuccess = '[Server] Send to server Success'
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

    constructor(public payload: { sender: string, message: string }) { }
}

export class UpdateWindowSuccess implements Action {
    readonly type = AppActionTypes.UpdateWindowSuccess;
}

export class SendToServer implements Action {
    readonly type = AppActionTypes.sendToServer;

    constructor(public payload: string) { }
}

export class SendToServerSuccess implements Action {
    readonly type = AppActionTypes.sendToServerSuccess;
}

export type AppActions =
    | ConnectToServer
    | ConnectToServerSuccess
    | UpdateWindow
    | SendToServer
    | SendToServerSuccess;
