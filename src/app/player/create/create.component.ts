import { Component, OnInit } from '@angular/core';
import { CreateService } from './create.service';
import { Race } from '../Interface/race.interface';

@Component({
  selector: 'app-create-player',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreatePlayerComponent implements OnInit {
  races: Race[];
  constructor(private service: CreateService) { }

  ngOnInit() {
    this.service.getRace().subscribe(data => {
      this.races = data;
  });
  }

}
