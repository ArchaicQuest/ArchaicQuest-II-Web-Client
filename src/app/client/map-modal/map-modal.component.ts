import { ChangeDetectionStrategy, Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { sigma } from 'sigma';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapModalComponent implements OnInit {

public sigma: any;

// @ViewChild('mapContainerModal', { static: false }) mapContainerModal;
  constructor(private clientService: ClientService, private formBuilder: FormBuilder, 
    public dialogRef: MatDialogRef<MapModalComponent>,
     @Inject(MAT_DIALOG_DATA) public data: { map: any },private http: HttpClient) { }

  ngOnInit() {
    console.log(this.data.map)
   
this.generateMap();
  }

  generateMap() {

 
    this.sigma = new sigma({
      container: 'mapContainer', settings: {
        labelThreshold: 5000,
        skipErrors: true,
        scalingMode: 'outside'
      },

    });

    var pnode = '';
    for (var i in this.data.map.map['nodes']) {

      if (this.data.map.map['nodes'][i].id == "node" + this.data.map.roomId) {
        this.data.map.map['nodes'][i].color = '#FF7619'
        pnode = this.data.map.map['nodes'][i];

        break;
      };

    }

    if (this.data.map.map['nodes'] == null) { return; }
    // let newNodes = this.data.map.map['nodes'].filter(x => x.x >= x.x + 7);
    // console.log("edges ", this.data.map.map['edges']);


    var graph = this.data.map.map;



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
        ratio: this.data.map.map['nodes'].length < 20 ? 1.2 : 0.4
      },
      {
        duration: 0
      }
    );

  }

 
  close() {
    this.dialogRef.close();
  }


}
