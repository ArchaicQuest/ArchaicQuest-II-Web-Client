import {
    Component,
    OnInit,
    ViewEncapsulation
} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    encapsulation: ViewEncapsulation.None,
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "ArchaicQuestII-Client";




    constructor() { }

    ngOnInit(): void {


    }


}
