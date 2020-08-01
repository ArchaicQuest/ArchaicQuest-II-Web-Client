import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ClientService } from '../client.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-stat-bar',
    templateUrl: './stat-bar.component.html',
    styleUrls: ['./stat-bar.component.scss']
})

export class StatComponent implements OnInit {
    @Input() type: string;

    constructor(private _clientService: ClientService) { }

    ngOnInit() {

    }




}
