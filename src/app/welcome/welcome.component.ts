import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from '../player/account/account.component';
import { Router } from '@angular/router';
import { AccountService } from '../player/account/account.service';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    public form: FormGroup;
    public loading: boolean;
    constructor(public dialog: MatDialog, private _router: Router, private _service: AccountService) { }

    ngOnInit() {
        this.form = this._service.loginForm;
    }

    signIn(event: any) {

        this._service.toggleSignUpButton(event.target);

        const data = {
            username: this.form.get('email').value,
            password: this.form.get('password').value
        };

        this._service.login(data, event.target);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateAccountComponent, {
            minWidth: '450px',
            maxWidth: '450px',
            data: {}
        });

        this._router.events
            .subscribe(() => {
                dialogRef.close();
            });

    }
}