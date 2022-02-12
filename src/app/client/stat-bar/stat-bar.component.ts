import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../client.service';
import { Stats } from './stats.interface';

@Component({
  selector: 'app-stat-bar',
  templateUrl: './stat-bar.component.html',
  styleUrls: ['./stat-bar.component.scss']
})

export class StatComponent implements OnInit {
  @Input() type: string;
  @Input() label: string;
  @Input() stats: Stats;
  @Input() showCurrent: boolean = true;

  constructor(private _clientService: ClientService) { }

  ngOnInit() {

  }




}
