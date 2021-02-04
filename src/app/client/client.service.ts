import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Stats, PlayerStats } from './stat-bar/stats.interface';
import { Player } from '../player/Interface/player.interface';

@Injectable({
    providedIn: 'root'
})
export class ClientService implements OnDestroy {
    private connection: HubConnection;
    private connectionId: string;
    private characterId: string;
    public connected = false;

    /*
        Data
        The data sent from the server to the client, such as room descriptions, command output, etc
    */
    public data: string[] = [];
    public $data: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(this.data);

    public eq: string = "";
    public $eq: BehaviorSubject<string> = new BehaviorSubject<string>(this.eq);

    public quest: string = "";
    public $quest: BehaviorSubject<any> = new BehaviorSubject<string>(this.quest);

    public inv: string = "";
    public $inv: BehaviorSubject<string> = new BehaviorSubject<string>(this.inv);

    public comms: { text: string, type: string } = { text: '', type: '' };
    public $comms: BehaviorSubject<{ text: string, type: string }> = new BehaviorSubject<{ text: string, type: string }>(this.comms);

    public map: { map: string, roomId: number } = {
        map: "",
        roomId: 0
    };
    public $map: BehaviorSubject<{ map: string, roomId: number }> = new BehaviorSubject<{ map: string, roomId: number }>(this.map);

    public playerScore: Player = null;
    public $playerScore: BehaviorSubject<Player> = new BehaviorSubject<Player>(this.playerScore);

    /*
        Player stats
        The HP, Mana, Moves, and Exp sent from the server to the player
    */
    public stats: PlayerStats = {
        hp: {
            current: 0,
            max: 0
        },
        mana: {
            current: 0,
            max: 0
        },
        moves: {
            current: 0,
            max: 0
        },
        exp: {
            current: 0,
            max: 0
        }
    }
    public $stats: BehaviorSubject<PlayerStats> = new BehaviorSubject<PlayerStats>(this.stats);

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

                        this.connectionId = connectionId;
                        this.connection.send('welcome', this.connectionId);
                        this.connection.send('AddCharacter', this.connectionId, this.characterId);
                    });


            })
            .catch(err => console.error(err.toString()));
    }

    private createEvents() {
        this.connection.on('SendMessage', (sender, message) => {

            this.updateWindow(sender, message);

        });

        this.connection.on('UpdatePlayerHP', (currentHp, maxHP) => {

            this.updateStats(currentHp, maxHP, 'hp');
        });

        this.connection.on('UpdatePlayerMana', (currentMana, maxMana) => {

            this.updateStats(currentMana, maxMana, 'mana');
        });

        this.connection.on('UpdatePlayerMoves', (currentMoves, maxMoves) => {

            this.updateStats(currentMoves, maxMoves, 'moves');
        });

        this.connection.on('UpdatePlayerExp', (currentExp, maxExp) => {

            this.updateStats(currentExp, maxExp, 'exp');
        });

        this.connection.on('QuestUpdate', (quest) => {

            this.quest = quest;
            this.questChange();
        });


        this.connection.on('EquipmentUpdate', (eq) => {

            this.eq = eq;
            this.EquipmentChange();
        });

        this.connection.on('InventoryUpdate', (inv) => {
            console.log('InventoryUpdate', inv);
            this.inv = inv;
            this.$inv.next(this.inv);
        });

        this.connection.on('ScoreUpdate', (player) => {

            this.playerScore = player;
            this.$playerScore.next(this.playerScore);
        });

        this.connection.on('CommUpdate', (txt, type) => {

            this.comms = {
                text: txt,
                type: type

            };
            this.$comms.next(this.comms);
        });

        this.connection.on('MapUpdate', (map, roomId) => {

            this.map.map = JSON.parse(map);
            this.map.roomId = roomId;
            this.$map.next(this.map);
        });

        this.connection.on('SendAction', (sender, message) => {


            this.updateWindow(sender, message);

        });

        this.connection.on('Close', (sender, message) => {


            this.closeConnection();

        });
    }


    public returnConnection() {
        return this.connection;
    }

    private questChange() {
        this.$quest.next(this.quest);
    }
    private EquipmentChange() {
        this.$eq.next(this.eq);
    }


    public updateStats(current: number, max: number = 0, type: string) {

        this.stats[type].max = max;
        this.stats[type].current = current;

        this.statsChange();
    }

    private statsChange() {
        this.$stats.next(this.stats);
    }


    // Handles updating data in the client window

    private eventChange() {
        this.$data.next(this.data);
    }

    public updateWindow(sender: string = '', message: string = '') {
        this.data.push(sender + ' ' + message);
        this.eventChange();
    }

    public sendToServer(message: string) {
        this.updateWindow('', `<p class="echo">${message}</p>`);
        this.connection.send('SendToServer', message, this.connectionId).catch(err => { });
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
