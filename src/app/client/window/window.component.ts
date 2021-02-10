import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ClientService } from '../client.service';
import { Subscription, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { trigger, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { ContextModalComponent } from 'src/app/context-modal/context-modal.component';

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.Default,
    host: {
        '(window:post-to-server)': 'OnClickSendToServer($event)',
        '(window:open-detail)': 'openDialog($event)'
    },
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: '0' }),
                animate('.4s ease-out', style({ opacity: '1' })),
            ]),
        ]),
    ],
})
export class WindowComponent implements OnInit, AfterContentInit, OnDestroy {
    public windowData: string[];
    public $data: Subscription;
    public componentActive = true;
    private lastKnownScrollPosition = 0
    public items: string[];
    private unsubscribe$ = new Subject<void>();
    userScrolled = false;
    @ViewChild('window', { static: true }) window: HTMLElement;

    constructor(private clientService: ClientService, private _snackBar: MatSnackBar, private elRef: ElementRef, public dialog: MatDialog) { }

    ngOnInit() {

    }

    trackByFn(index, item) {
        return index
    }

    openDialog(x: CustomEvent) {
        this.dialog.open(ContextModalComponent, {
            data: {
                name: x.detail.name,
                desc: x.detail.desc,
                type: x.detail.type,
                keyword: x.detail.keyword,
                canOpen: x.detail.canOpen
            }
        });
    }

    OnClickSendToServer(command: CustomEvent) {
        console.log(command)
        this.clientService.sendToServer(command.detail);
    }

    ngAfterContentInit(): void {

        this.$data = this.clientService.$data.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

            if (x.length) {
                // if user has scrolled above, show notification of new messages
                // let snackBarRef = this._snackBar.open('new message', 'View', {
                //     duration: 4000
                // });
                this.windowData = x;


            }
        });


    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
