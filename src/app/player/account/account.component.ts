import { Component, OnInit, Inject } from '@angular/core';
import { CreateService } from './../create/create.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
    selector: 'app-account-player',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class CreateAccountComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<CreateAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }



    ngOnInit() {

    }



}
