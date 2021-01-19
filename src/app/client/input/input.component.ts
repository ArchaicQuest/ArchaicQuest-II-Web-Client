import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ClientService } from '../client.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
    public form = this._formBuilder.group({
        input: ['', [Validators.required, Validators.maxLength(750)]],
    });
    commands: string[] = ['North', 'East', 'South', 'West', 'Down', 'Up', 'get', 'drop', 'kill', 'give', 'put', 'take', 'sit', 'stand', 'sleep', 'skills', 'spells', 'cast', 'newbie', 'ooc', 'gossip', 'say', 'yell', 'score', 'equipment', 'inventory'];
    filteredCommands: Observable<string[]>;

    constructor(private _clientService: ClientService, private _formBuilder: FormBuilder) { }

    ngOnInit() {
        this.filteredCommands = this.form.get('input').valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );

    }


    private _filter(value: string): string[] {
        const filterValue = this._normalizeValue(value);

        return this.commands.filter(x => this._normalizeValue(x).startsWith(filterValue));
    }

    private _normalizeValue(value: string): string {
        return value.toLowerCase().replace(/\s/g, '');
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
        return (this.form.get('input').value as string).replace(/<[^>]*>/g, '').trim();
    }

}
