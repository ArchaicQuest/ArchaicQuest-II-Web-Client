import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { ConnectToServerSuccess, ConnectToServer, UpdateWindow } from './state/app.actions';
@Injectable({
    providedIn: 'root'
})
export class AppService {
    // private host = environment.hostAPI;
    private connection: signalR.HubConnection;

    constructor(private store: Store<AppState>) {
        this.initHub();
    }

    private initHub() {
        this.store.dispatch(new ConnectToServer());
        this.connectToHub();
    }

    private connectToHub() {
        this.connection = new signalR.HubConnection('http://localhost:57814/Hubs/game');
        this.connection.start().then(() => {
            this.store.dispatch(new ConnectToServerSuccess(true));
            this.createEvents();
        }).catch((err => console.error(err.toString())));
    }

    private createEvents() {
        this.connection.on('SendMessage', (sender, message) => {
            this.store.dispatch(new UpdateWindow(sender + ' : ' + message));
        });

        // this.connection.on("SendAction", (sender, action) => {
        //     // this.appendMessage += sender + " " + action;
        // });
    }

    public returnConnection() {
        return this.connection;
    }

}
