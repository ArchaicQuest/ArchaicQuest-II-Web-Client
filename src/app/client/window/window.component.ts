import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit, ViewEncapsulation } from '@angular/core';
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
    styleUrls: ['./window.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class WindowComponent implements OnInit, AfterContentInit, OnDestroy {
    public windowData = '';
    public $data: Subscription;
    public componentActive = true;
    @ViewChild('window', { static: true }) window: ElementRef;

    constructor(private clientService: ClientService) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        console.log("ngOnDestroy InDashBoard");
    }

    ngAfterContentInit(): void {
        this.$data = this.clientService.$data.subscribe(x => {
            console.log(x)

            if (x.length) {

                this.windowData += x.pop();
            }
        });

    }




}
