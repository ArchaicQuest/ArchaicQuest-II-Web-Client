import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { SendToServer } from 'src/app/state/app.actions';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
    @ViewChild('input', { static: true }) input: ElementRef;
    @ViewChild('btn', { static: true }) btn: ElementRef;
    constructor(private store: Store<AppState>) { }

    ngOnInit() {
    }

    sendToServer() {
        this.store.dispatch(new SendToServer(this.input.nativeElement.value));

    }

}
