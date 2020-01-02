import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from '../player/account/account.component';


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
    constructor(public dialog: MatDialog) { }

    signIn() {
        //Auth logic


    }

    openDialog(): void {
        const dialogRef = this.dialog.open(CreateAccountComponent, {
            minWidth: '450px',
            maxWidth: '450px',
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result)
        });
    }

    createAccount() {

    }

}
