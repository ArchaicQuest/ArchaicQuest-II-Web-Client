import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ClientService } from '../client.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
    @ViewChild("inputTxt", { static: true }) inputTxt: ElementRef;

    public form = this._formBuilder.group({
        input: ['', [Validators.required, Validators.maxLength(750)]],
    });
    passedCommandsIndex: number = 0;
    passedCommands: string[] = [];


    constructor(private _clientService: ClientService, private _formBuilder: FormBuilder) { }

    ngOnInit() {


        document.onkeydown = (e) => {
            switch (e.key) {

                case "ArrowUp":
                    this.getPassCommand(true);
                    break;
                case "ArrowDown":
                    this.getPassCommand(false);
                    break;
                default:
                    this.passedCommandsIndex = 0;

            }
        };

    }


    getPassCommand(increment: boolean) {


        let value = this.passedCommands.reverse()[this.passedCommandsIndex];
        this.passedCommands.reverse();

        if (value) {
            this.form.get('input').setValue('');
            setTimeout(() => {
                this.form.get('input').setValue(value);
            });

        }


        if (increment) {

            if (this.passedCommandsIndex > this.passedCommands.length) {
                this.passedCommandsIndex = this.passedCommands.length;
            }
            this.passedCommandsIndex += 1;
        } else {

            if (this.passedCommandsIndex < 0) {
                this.passedCommandsIndex = 0;
            }
            this.passedCommandsIndex -= 1;
        }


    }


    sendToServer() {
        this.passedCommands.push(this.cleanInput());
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
