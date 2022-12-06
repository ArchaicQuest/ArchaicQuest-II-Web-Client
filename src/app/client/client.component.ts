import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ClientService } from './client.service';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stats, PlayerStats } from './stat-bar/stats.interface';
import { Player } from '../player/Interface/player.interface';
import { sigma } from 'sigma';
import { animation } from '@angular/animations';
import { Quest } from '../_shared/interface/quest.interface';
import { ContentModalComponent } from './content-modal/content-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { MapModalComponent } from './map-modal/map-modal.component';


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
  public $quest: Subscription;
  public quest: Quest[];
  public $inv: Subscription;
  public inv: string;
  public $playerScore: Subscription;
  public playerScore: Player;
  public $comms: Subscription;
  public comms: { text: string, type: string };
  public $map: Subscription;
  public $affects: Subscription;
  public $sounds: Subscription;
  public $time: Subscription;
  public $contentPopup: Subscription;
  public time: string;
  public contentPopup: string;
  public affects: any;
  public sounds: any;
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
  audio: HTMLAudioElement = new Audio(); 
soundArray: HTMLAudioElement[] = [];
soundArrayIndex = 0;
  @ViewChild('mapContainer', { static: false }) mapContainer;
  constructor(private clientService: ClientService, public dialog: MatDialog) { }

  ngOnInit() {
    this.clientService.initHub();

  }

  ngAfterContentInit(): void {

    this.$stats = this.clientService.$stats.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

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

      this.eq = this.clientService.ParseHtmlColorCodes(x);
    });


    this.$time = this.clientService.$time.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

      this.time = x;
    });

    this.$contentPopup = this.clientService.$contentPopup.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

      this.contentPopup = x;
    });

    this.$quest = this.clientService.$quest.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      if (x == '') { return; }

      this.quest = JSON.parse(x);
      console.log(this.quest);
    });

    this.$inv = this.clientService.$inv.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      console.log("inv", x)
      this.inv = this.clientService.ParseHtmlColorCodes(x);
    });

    this.$affects = this.clientService.$affects.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      console.log("affects", x)
      this.affects = x;
    });

    this.$sounds = this.clientService.$sounds.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {
      console.log("sounds", x)
      this.sounds = x;

      
 
      const footsteps = ['footstep-dirt-0.wav', 'footstep-dirt-1.wav', 'footstep-dirt-2.wav', 'footstep-dirt-3.wav']
      const foraging = ['foraging.mp3', 'foraging2.mp3']
      let soundString = ''
      if(x == 'hit') {
       soundString = 'assets/sounds/swordHit.wav'
      }
      else if(x == 'miss') {
        soundString = 'assets/sounds/slashMiss.wav'
        
       }
       else if(x == 'parry') {
        soundString = 'assets/sounds/parry.wav'
       }
      else {
       soundString = `assets/sounds/${footsteps[Math.floor(Math.random() * footsteps.length)]}`
      }

      if(x == 'foraging') {
        soundString = `assets/sounds/${foraging[Math.floor(Math.random() * foraging.length)]}`
      }

      if(x == 'get') {
        soundString = `assets/sounds/grab.wav`
      }

      if(x == 'drop') {
        soundString = `assets/sounds/drop.wav`
      }


      if(x == 'quaff') {
        soundString = `assets/sounds/quaff.wav`
      }

      this.soundArray.push(new Audio(soundString));
      //var audio: HTMLAudioElement = new Audio(soundString);
  console.log(this.soundArray)

  const onended = (evt) => {
    this.sounds.shift().play(); // play the next sound
  }
  

this.soundArray.forEach(sound => {
  sound.onended = onended; 
});

console.log(this.soundArray.length)
if(this.soundArray.length == 1) {
  this.soundArray.shift().play();

}




    });


    this.$comms = this.clientService.$comms.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

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
        case "all":
          this.channels.all.push(x.text);
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

    if (this.map.map['nodes'] == null) { return; }
    // let newNodes = this.map.map['nodes'].filter(x => x.x >= x.x + 7);
    // console.log("edges ", this.map.map['edges']);


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
        ratio: this.map.map['nodes'].length < 20 ? 1.2 : 0.6  
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

  editDescription() {
    this.dialog.open(ContentModalComponent, {
      data: {
        name: "Description",
        desc: this.playerScore?.description,
        type: "description"
      },
      width: '750px'
    });
  }

  openSettings() {
    this.dialog.open(SettingsModalComponent, {
      data: {},
      width: '750px'
    });
  }

  openMap() {
    this.dialog.open(MapModalComponent, {
      data: {
        map: this.map
      },
      width: '100%'
    });
  }
}
