import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { takeWhile } from 'rxjs/operators';
import { UpdateWindow } from 'src/app/state/app.actions';
import { selectData } from 'src/app/state/app.selector';
import { ClientService } from '../client.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, AfterContentInit, OnDestroy {
    public windowData: string;
    public $data: Subscription;
    public componentActive = true;
    public isConnecting = true;
    @ViewChild('window', { static: true }) window: ElementRef;

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        //this.clientService.updateWindow('Malleus', 'Welcome to archaicQuest II');
        this.isConnecting = true;///this.clientService.connected;
        console.log(this.isConnecting)
    }

    ngOnDestroy() {
        console.log("ngOnDestroy InDashBoard");
    }

    ngAfterContentInit(): void {
        this.$data = this.clientService.$data.subscribe(x => {
            this.windowData += x.pop();
        });

    }




}
