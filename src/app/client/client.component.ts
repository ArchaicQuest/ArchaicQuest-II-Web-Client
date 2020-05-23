import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from './client.service';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {

    constructor(private clientService: ClientService) { }

    ngOnInit() {
        this.clientService.initHub();
    }

    ngOnDestroy(): void {
        this.clientService.closeConnection();

    }

}
