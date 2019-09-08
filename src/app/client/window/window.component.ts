import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { takeWhile } from 'rxjs/operators';
import { UpdateWindow } from 'src/app/state/app.actions';
import { selectData } from 'src/app/state/app.selector';

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent implements OnInit, AfterViewInit, OnDestroy {
    public data: string;
    public componentActive = true;
    @ViewChild('window', { static: true }) window: ElementRef;

    constructor(private store: Store<AppState>) { }

    ngOnInit() {
        this.store.dispatch(new UpdateWindow('<p>Welcome to archaicQuest II</p>'));


        for (let index = 0; index < 100; index++) {
            this.store.dispatch(new UpdateWindow('<p>Welcome to archaicQuest II ' + index + '</p>'));

        }


    }

    ngOnDestroy() {
        console.log("ngOnDestroy InDashBoard");
    }

    ngAfterViewInit(): void {
        this.store.pipe(select(selectData)).subscribe((data: string) => {
            console.log(data)
            this.data = data;
            // this.window.nativeElement.insertAdjacentHTML('beforeend', data);
        });

        //console.log(this.store.pipe(select(selectData)))
    }




}
