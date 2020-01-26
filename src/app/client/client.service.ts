import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ClientService {
    // private host = environment.hostAPI;
    private connection: signalR.HubConnection;
    private connectionId: string;
    public connected = false;
    public data: string[] = [];
    public $data: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.data);

    constructor() {
        this.initHub();
    }

    private initHub() {
        this.updateWindow('', '<div>Connecting to ArchaicQuest, please wait.</div>');
        this.connectToHub();

    }

    private connectToHub() {
        this.connection = new signalR.HubConnection(
            'http://localhost:62640/Hubs/game'
        );
        this.connection
            .start()
            .then(x => {
                this.connected = true;
                this.createEvents();
                this.connectionId = this.connection['connection'].connectionId;
                this.connection.send('welcome', this.connectionId);
            })
            .catch(err => console.error(err.toString()));
    }

    private createEvents() {
        this.connection.on('SendMessage', (sender, message) => {
            console.log('send message', sender + ' ' + message);
            this.updateWindow(sender, message);

        });

        this.connection.on('SendAction', (sender, message) => {

            console.log('send action', sender + ' ' + message);
            this.updateWindow(sender, message);

        });
    }

    private eventChange() {
        this.$data.next(this.data);
    }


    public updateWindow(sender: string = '', message: string = '') {
        this.data.push(sender + ' ' + message);
        this.eventChange();
    }

    public sendToServer(message: string) {
        console.log("what", message)
        this.connection.send('send', message).catch(err => { });
    }

    public returnConnection() {
        return this.connection;
    }
}
