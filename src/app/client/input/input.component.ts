import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ClientService } from '../client.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

    public form = this._formBuilder.group({
        input: ['', [Validators.required, Validators.maxLength(750)]],
    });
    constructor(private _clientService: ClientService, private _formBuilder: FormBuilder) { }

    ngOnInit() {
    }

    sendToServer() {
        this._clientService.sendToServer(this.cleanInput());
    }

    /*
        Removes html tags
        Trims white space
        Makes lowercase
    */
    cleanInput(): string {
        return (this.form.get('input').value as string).replace(/<[^>]*>/g, '').toLowerCase().trim();
    }

}
