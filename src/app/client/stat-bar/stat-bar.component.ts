import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ClientService } from '../client.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-stat-bar',
    templateUrl: './stat-bar.component.html',
    styleUrls: ['./stat-bar.component.scss']
})
export class StatComponent implements OnInit {


    constructor(private _clientService: ClientService) { }

    ngOnInit() {
    }



}
