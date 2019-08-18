import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'ArchaicQuestII-Client';
    connection: any;
    appendMessage: string;

    @ViewChild('input', { static: true }) input: ElementRef;
    @ViewChild('btn', { static: true }) btn: ElementRef;
    ngOnInit(): void {
        this.connection = new signalR.HubConnection('http://localhost:57814/Hubs/game');
        this.connection.on('SendMessage', (sender, message) => {
            this.appendMessage += sender + ': ' + message;
        });

        this.connection.on('SendAction', (sender, action) => {
            this.appendMessage += sender + ' ' + action;
        });

        this.connection.start().then(() => {
            this.input.nativeElement.disabled = false;
            this.btn.nativeElement.disabled = false;
        });
    }


    send() {
        this.connection.send('Send', this.input.nativeElement.value);
    }

}
