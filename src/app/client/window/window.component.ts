import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
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
export class WindowComponent implements OnInit, AfterViewInit {
    public data: string;
    public componentActive = true;
    constructor(private elementRef: ElementRef, private store: Store<AppState>) { }

    ngOnInit() {
        this.store.dispatch(new UpdateWindow('Welcome to archaicuest'));

        this.store.pipe(select(selectData)).subscribe((data: string) => {
            console.log(data)
            this.elementRef.nativeElement.insertAdjacentHTML('beforeend', data);
        });

        this.store.pipe(select('data')).subscribe(data => (this.elementRef.nativeElement.insertAdjacentHTML('beforeend', data)));


    }

    ngAfterViewInit(): void {
        this.store.dispatch(new UpdateWindow('Welcome to archaicuest II'));
        this.store.dispatch(new UpdateWindow('Welcome to archaicuest II'));
        this.store.dispatch(new UpdateWindow('Welcome to archaicuest II'));
        this.store.dispatch(new UpdateWindow('Welcome to archaicuest II'));

        console.log(this.store.pipe(select(selectData)))
    }




}
