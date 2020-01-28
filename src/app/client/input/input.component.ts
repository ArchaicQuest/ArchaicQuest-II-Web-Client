import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ClientService } from '../client.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
    @ViewChild('input', { static: false }) input: ElementRef;
    @ViewChild('btn', { static: false }) btn: ElementRef;
    constructor(private clientService: ClientService) { }

    ngOnInit() {
    }

    sendToServer() {
        this.clientService.sendToServer(this.input.nativeElement.value);
    }

}
