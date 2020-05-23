import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit, ViewEncapsulation } from '@angular/core';
import { ClientService } from '../client.service';
import { Subscription, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';

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
    private unsubscribe$ = new Subject<void>();
    userScrolled = false;
    @ViewChild('window', { static: true }) window: HTMLElement;

    constructor(private clientService: ClientService, private _snackBar: MatSnackBar) { }

    ngOnInit() {

    }


    ngAfterContentInit(): void {

        this.$data = this.clientService.$data.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

            if (x.length) {
                // if user has scrolled above, show notification of new messages
                // let snackBarRef = this._snackBar.open('new message', 'View', {
                //     duration: 4000
                // });
                this.windowData += x.pop();
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
