import { Component, OnInit, Inject } from '@angular/core';
import { CreateService } from './../create/create.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountService } from './account.service';
import { FormGroup } from '@angular/forms';


@Component({
    selector: 'app-account-player',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class CreateAccountComponent implements OnInit {
    public form: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<CreateAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private _service: AccountService) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    signUp(event: any) {

        this._service.toggleSignUpButton(event.target);

        const data = {
            username: this.form.get('username').value,
            email: this.form.get('email').value,
            password: this.form.get('password').value
        };

        this._service.signUp(data, event.target);
    }



    ngOnInit() {
        this.form = this._service.signUpForm;
    }



}
