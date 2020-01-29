import { Component } from '@angular/core';
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
export class WelcomeComponent {
  public form: FormGroup;
    constructor(public dialog: MatDialog, private _router: Router, private _service: AccountService) { }

    signIn(event: any) {
      this._service.toggleSignUpButton(event.target);

      const data = {
          email: this.form.get('email').value,
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
