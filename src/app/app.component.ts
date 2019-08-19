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

  @ViewChild("input", { static: true }) input: ElementRef;
  @ViewChild("btn", { static: true }) btn: ElementRef;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new ConnectToServer());

    this.store
      .pipe(
        select(selectConnection),
        take(1)
      )
      .subscribe((conn: any) => {
        conn.start().then(() => {
          this.input.nativeElement.disabled = false;
          this.btn.nativeElement.disabled = false;
        });

        conn.connection.on("SendMessage", (sender, message) => {
          this.appendMessage += sender + ": " + message;
        });

        conn.connection.on("SendAction", (sender, action) => {
          this.appendMessage += sender + " " + action;
        });
      });

    // this.store
    //   .pipe(
    //     select(selectConnection),
    //     takeWhile(() => this.componentActive)
    //   )
    //   .subscribe((conn: any) => {
    //     conn.start().then(() => {
    //       this.input.nativeElement.disabled = false;
    //       this.btn.nativeElement.disabled = false;
    //     });

    //     conn.connection.on("SendMessage", (sender, message) => {
    //       this.appendMessage += sender + ": " + message;
    //     });

    //     conn.connection.on("SendAction", (sender, action) => {
    //       this.appendMessage += sender + " " + action;
    //     });
    //   });

    // this.connection.on('SendMessage', (sender, message) => {
    //     this.appendMessage += sender + ': ' + message;
    // });

    // this.connection.on('SendAction', (sender, action) => {
    //     this.appendMessage += sender + ' ' + action;
    // });

    // this.connection.start().then(() => {
    //     this.input.nativeElement.disabled = false;
    //     this.btn.nativeElement.disabled = false;
    // });
  }
  send() {
    this.connection.send("Send", this.input.nativeElement.value);
  }
}
