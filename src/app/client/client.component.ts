import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ClientService } from './client.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stats, PlayerStats } from './stat-bar/stats.interface';
import { Player } from '../player/Interface/player.interface';
import { sigma } from 'sigma';


@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit, OnDestroy {
    public $stats: Subscription;
    private unsubscribe$ = new Subject<void>();
    public hp: Stats = {
        current: 0,
        max: 0
    };
    public playerStats: PlayerStats = {
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
    };
    public $eq: Subscription;
    public eq: string;
    public $inv: Subscription;
    public inv: string;
    public $playerScore: Subscription;
    public playerScore: Player;
    public $comms: Subscription;
    public comms: string;
    public $map: Subscription;
    //public map: string;
    public channels: {
        all: string[],
        room: string[],
        newbie: string[],
        gossip: string[],
        ooc: string[]
    }
    public map: { map: string, roomId: number } = {
        map: "",
        roomId: 1
    };
    maxValueOfX: number;
    maxValueOfY: number;
    minValueOfX: number;
    minValueOfY: number;
    totalCol: number;
    totalRow: number;
    rooms: { x: number, y: number }[] = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }, { x: -1, y: 0 }];
    sigma: any = null;

    @ViewChild('mapContainer', { static: false }) mapContainer;
    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.clientService.initHub();
    }

    ngAfterContentInit(): void {

        this.$stats = this.clientService.$stats.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)
            this.playerStats.hp.current = x.hp.current;
            this.playerStats.hp.max = x.hp.max;
            this.playerStats.mana.current = x.mana.current;
            this.playerStats.mana.max = x.mana.max;
            this.playerStats.moves.current = x.moves.current;
            this.playerStats.moves.max = x.moves.max;
            this.playerStats.exp.current = x.exp.current;
            this.playerStats.exp.max = x.exp.max;
        });

        this.$eq = this.clientService.$eq.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)
            this.eq = x;
        });

        this.$inv = this.clientService.$inv.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)
            this.inv = x;
        });

        this.$comms = this.clientService.$comms.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)
            this.comms = x;
            this.channels.all.push(x);
            this.channels.room.concat(x);

        });


        this.$playerScore = this.clientService.$playerScore.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

            if (x == null) {
                return;
            }

            this.playerScore = JSON.parse((x as unknown as string)).player;

        });


    }

    ngAfterViewInit() {

        this.$map = this.clientService.$map.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
            console.log(x)

            this.map.map = x.map;
            this.map.roomId = x.roomId;

            if (x != null) {
                this.generateMap();
            }



        });

    }

    generateMap() {



        //if (this.sigma == null || this.sigma.graph == null) {

        // var playerNode = (this.map as any).nodes.
        //  console.log("containers", this.mapContainer.innerHTML)
        this.mapContainer.innerHTML = "";

        for (var i in this.map.map['nodes']) {
            if (this.map.map['nodes'][i].id == "node" + this.map.roomId) {
                this.map.map['nodes'][i].color = '#FF7619'
                break;
            };
        }


        var graph = this.map.map;
        this.sigma = new sigma({
            container: 'container', settings: {
                defaultNodeColor: '#ec5148',
                labelThreshold: 5000,
                skipErrors: false
            },
        });

        this.sigma.graph.read(graph);


        this.sigma.refresh();
        //}

        // Finally, let's ask our sigma instance to refresh:

    }

    isRoom(room: { x: number, y: number }) {
        return this.rooms.find(x => x.x === room.x && x.y === room.y);
    }

    ngOnDestroy(): void {
        this.clientService.closeConnection();

    }

}
