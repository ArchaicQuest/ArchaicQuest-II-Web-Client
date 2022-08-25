import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { CreateService } from '../create/create.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';
import * as Bowser from "bowser";

export function matchValidator(
  matchTo: string, 
  reverse?: boolean
): ValidatorFn {
  return (control: AbstractControl): 
  ValidationErrors | null => {
    if (control.parent && reverse) {
      const c = (control.parent?.controls as any)[matchTo]  as AbstractControl;
      if (c) {
        c.updateValueAndValidity();
      }
      return null;
    }
    return !!control.parent &&
      !!control.parent.value &&
      control.value === 
      (control.parent?.controls as any)[matchTo].value
      ? null
      : { matching: true };
  };
}


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string}, private _service: AccountService, private _formBuilder: FormBuilder) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetPassword(event: any) {

    this._service.toggleSignUpButton(event.target);

    const data = {
      password: this.form.get('password').value,
      id: this.data.id
    };

    this._service.resetPassword(data, event.target, this.dialogRef);
  }


  ngOnInit() {
    this.form = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6),  matchValidator('confirmPassword', true)]],
       confirmPassword: ['', [Validators.required, Validators.minLength(6),   matchValidator('password')]],
     });
  }

}
