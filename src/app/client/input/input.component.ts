import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { SendToServer } from 'src/app/state/app.actions';
import { AppService } from 'src/app/app.service';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
    @ViewChild('input', { static: false }) input: ElementRef;
    @ViewChild('btn', { static: false }) btn: ElementRef;
    constructor(private addItemService: AppService) { }

    ngOnInit() {
    }

    sendToServer() {
        this.addItemService.sendToServer(this.input.nativeElement.value);
    }

}
