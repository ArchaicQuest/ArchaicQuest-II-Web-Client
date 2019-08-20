import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    ViewEncapsulation
} from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { Store, select } from "@ngrx/store";
import { AppState } from "./state/app.state";
import { ConnectToServer } from "./state/app.actions";
import { selectConnection } from "./state/app.selector";
import { takeWhile, take } from "rxjs/operators";
import { AppService } from './app.service';

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "ArchaicQuestII-Client";
    connection: any;
    appendMessage: string;

    componentActive = true;



    constructor(private store: Store<AppState>, private appService: AppService) { }

    ngOnInit(): void {


    }


}
