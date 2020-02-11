import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { ClientService } from '../client.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    constructor(private clientService: ClientService, private _snackBar: MatSnackBar) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        console.log("ngOnDestroy InDashBoard");
    }

    ngAfterContentInit(): void {

        this.$data = this.clientService.$data.subscribe(x => {

            if (x.length) {
                // if user has scrolled above, show notification of new messages
                // let snackBarRef = this._snackBar.open('new message', 'View', {
                //     duration: 4000
                // });
                this.windowData += x.pop();
            }
        });
    }
}
