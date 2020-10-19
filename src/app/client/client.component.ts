import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ClientService } from './client.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stats, PlayerStats } from './stat-bar/stats.interface';
import { Player } from '../player/Interface/player.interface';
import { sigma } from 'sigma';
import { animation } from '@angular/animations';


@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],

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
    public comms: { text: string, type: string };
    public $map: Subscription;
    public showInfoMobile: boolean;
    //public map: string;
    public channels: {
        all: string[],
        room: string[],
        newbie: string[],
        gossip: string[],
        ooc: string[]
    } = {
            all: [],
            room: [],
            newbie: [],
            gossip: [],
            ooc: []
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
            if (x.text == '') { return; }

            switch (x.type) {
                case "room":
                    this.channels.all.push(x.text);
                    this.channels.room.push(x.text);
                    break;
                case "newbie":
                    this.channels.all.push(x.text);
                    this.channels.newbie.push(x.text);

                    break;
                case "gossip":
                    this.channels.all.push(x.text);
                    this.channels.gossip.push(x.text);

                    break;
                case "ooc":
                    this.channels.all.push(x.text);
                    this.channels.ooc.push(x.text);

                    break;

                default:
                    break;
            }

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

            if (x != null || x.map != null) {
                this.generateMap();
            }



        });

    }

    generateMap() {

        this.mapContainer.nativeElement.innerHTML = "";
        this.sigma = new sigma({
            container: 'container', settings: {
                labelThreshold: 5000,
                skipErrors: true,
                scalingMode: 'outside'
            },

        });

        var pnode = '';
        for (var i in this.map.map['nodes']) {
            if (this.map.map['nodes'][i].id == "node" + this.map.roomId) {
                this.map.map['nodes'][i].color = '#FF7619'
                pnode = this.map.map['nodes'][i];

                break;
            };

        }
        // console.log("xcx", this.map.map['nodes'])
        if (this.map.map['nodes'] == null) { return; }
        // let newNodes = this.map.map['nodes'].filter(x => x.x >= x.x + 7);
        // console.log("filter ", newNodes);


        var graph = this.map.map;



        this.sigma.graph.read(graph);


        this.sigma.refresh();
        // HOLY SHIT that took a long time to figure out.
        // camera controls in sigmajs don't mirror the x,y coords of the grid
        // calling the below, passing in the id of the active node
        // returns an object that has the real camera x, y coords
        // using this you can move the camera around.
        // console.log("ss", this.sigma.graph.nodes(pnode["id"]))
        sigma.misc.animation.camera(
            this.sigma.camera,
            {
                x: this.sigma.graph.nodes(pnode["id"])["read_cam0:x"],
                y: this.sigma.graph.nodes(pnode["id"])["read_cam0:y"],
                angle: 0,
                ratio: 0.6
            },
            {
                duration: 0
            }
        );

    }

    isRoom(room: { x: number, y: number }) {
        return this.rooms.find(x => x.x === room.x && x.y === room.y);
    }

    ngOnDestroy(): void {
        this.clientService.closeConnection();

    }

    showInfo() {
        this.showInfoMobile = !this.showInfoMobile;
    }
}
