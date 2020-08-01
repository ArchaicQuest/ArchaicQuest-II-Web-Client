import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService implements OnDestroy {
    private connection: HubConnection;
    private connectionId: string;
    private characterId: string;
    public connected = false;
    public data: string[] = [];
    public $data: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.data);
    public stats: {
        hp: {
            min: number,
            max: number
        }
    };

    constructor() {

    }

    public initHub() {
        this.connection = new HubConnectionBuilder()
            .withUrl(`${environment.hostAPI}/Hubs/game`)
            .withAutomaticReconnect()
            .build();

        this.updateWindow('', '<div>Connecting to ArchaicQuest, please wait.</div>');
        this.characterId = sessionStorage.getItem('characterId');
        this.connectToHub();

    }

    private async connectToHub() {

        await this.connection
            .start()
            .then(x => {
                this.connected = true;
                this.createEvents();
                this.connectionId = this.connection['connection'].connectionId;

                this.connection.invoke('getConnectionId')
                    .then((connectionId) => {
                        console.log(connectionId)
                        this.connectionId = connectionId;
                        this.connection.send('welcome', this.connectionId);
                        this.connection.send('AddCharacter', this.connectionId, this.characterId);
                    });


            })
            .catch(err => console.error(err.toString()));
    }

    private createEvents() {
        this.connection.on('SendMessage', (sender, message) => {
            console.log('send message', sender + ' ' + message);
            this.updateWindow(sender, message);

        });

        this.connection.on('UpdatePlayerHP', (currentHp, maxHP) => {
            console.log('UpdatePlayerHP', currentHp + ' ' + maxHP);
            //   this.updateWindow(sender, message);

        });

        this.connection.on('SendAction', (sender, message) => {

            console.log('send action', sender + ' ' + message);
            this.updateWindow(sender, message);

        });
    }

    private eventChange() {
        this.$data.next(this.data);
    }

    public updateStats(current: number, max: number, type: string) {
       // this.data.push(sender + ' ' + message);
      //  this.eventChange();
    }


    public updateWindow(sender: string = '', message: string = '') {
        this.data.push(sender + ' ' + message);
        this.eventChange();
    }

    public sendToServer(message: string) {
        this.updateWindow('', `<p class="echo">${message}</p>`);
        this.connection.send('SendToServer', message, this.connectionId).catch(err => { });
    }

    public returnConnection() {
        return this.connection;
    }

    public closeConnection() {
        this.connection.off('SendMessage');
        this.connection.off('SendAction');
        this.connection.stop().then(() => {
            console.log("connection closed");
        }).catch(err => console.log(err));
    }

    ngOnDestroy(): void {
        this.connection = null;
    }
}
