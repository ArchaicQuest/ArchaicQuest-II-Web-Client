import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CreateService } from '../create/create.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import * as Bowser from "bowser";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _service: AccountService, private _formBuilder: FormBuilder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetPassword(event: any) {

    this._service.toggleSignUpButton(event.target);

    const deviceInfo = Bowser.getParser(window.navigator.userAgent);
    const data = {
      email: this.form.get('email').value,
      browserName: deviceInfo.getBrowserName() + ' ' + deviceInfo.getBrowserVersion(),
      osName: deviceInfo.getOSName()
    };

    this._service.forgotPassword(data, event.target);
    this.dialogRef.close();
  }


  ngOnInit() {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]]
    });
  }

}
