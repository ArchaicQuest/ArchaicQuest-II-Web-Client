import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from '../player/account/account.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../player/account/account.service';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordComponent } from '../player/forgot-password/forgot-password.component';
import { take } from 'rxjs';
import { ResetPasswordComponent } from '../player/reset-password/reset-password.component';


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
    public form: FormGroup;
    public loading: boolean;
    constructor(public dialog: MatDialog, private _router: Router, private _route: ActivatedRoute, private _service: AccountService) { }

    ngOnInit() {
        this.form = this._service.loginForm;

        this._route.queryParams.pipe(take(1))
        .subscribe(params => {

            if(Object.keys(params).length && params.id.length) {
                const id = encodeURI(params.id)
                this.openResetPasswordDialog(id);
            }
        })
}
    

    signIn(event: any) {

        this._service.toggleSignUpButton(event.target);

        const data = {
            username: (this.form.get('email').value as string).toLowerCase().trim(),
            password: (this.form.get('password').value as string).toLowerCase().trim()
        };

        this._service.login(data, event.target);
    }

    openResetPasswordDialog(id: string): void {
        const dialogRef = this.dialog.open(ResetPasswordComponent, {
            minWidth: '450px',
            maxWidth: '450px',
            data: {
                id
            }
        });

        this._router.events
            .subscribe(() => {
                dialogRef.close();
            });

    }

    openForgotPasswordDialog(): void {
        const dialogRef = this.dialog.open(ForgotPasswordComponent, {
            minWidth: '450px',
            maxWidth: '450px',
            data: {}
        });

        this._router.events
            .subscribe(() => {
                dialogRef.close();
            });

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
