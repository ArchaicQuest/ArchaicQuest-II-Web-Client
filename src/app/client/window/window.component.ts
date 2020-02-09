import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit, ViewEncapsulation } from '@angular/core';
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
    private lastKnownScrollPosition = 0;
    userScrolled = false;
    @ViewChild('window', { static: true }) window: HTMLElement;

    constructor(private clientService: ClientService) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        console.log("ngOnDestroy InDashBoard");
    }

    ngAfterContentInit(): void {
        let userScrolled = false;
        this.$data = this.clientService.$data.subscribe(x => {

            if (x.length) {

                const clientWindow = document.getElementById('js-client-window')

                const isScrolledToBottom = clientWindow.scrollHeight - clientWindow.clientHeight <= clientWindow.scrollTop + 1;

                this.windowData += x.pop();

                if (isScrolledToBottom) {
                    clientWindow.scrollTop = clientWindow.scrollHeight - clientWindow.clientHeight;
                }



            }


        });

    }




}
