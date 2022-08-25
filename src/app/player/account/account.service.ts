import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/_shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { matchValidator } from '../reset-password/reset-password.component';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public signUpForm = this._formBuilder.group({
    // username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.minLength(6),  matchValidator('confirmPassword', true)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6),   matchValidator('password')]],
  });

  public loginForm = this._formBuilder.group({
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _http: HttpService,
    private _formBuilder: FormBuilder,
    private _toast: ToastrService,
    private _router: Router
  ) { }

  toggleSignUpButton(button: any) {
    button.disabled = !button.disabled;
  }

  forgotPassword(data, button) {
    this._http.post(`${environment.hostAPI}/api/Account/forgot-password`, data).subscribe(
      response => {
        const serverResponse: { toast: string, id: string } = JSON.parse(response);
        this._toast.success(serverResponse.toast);

        
      },
      err => {
        console.log(err.error)
        if (err.error != null) {
          this._toast.error(err.error);
        }
        else {
          this._toast.error(`Whoops a server ${err.status} error has occurred.`);
        }
        this.toggleSignUpButton(button);
      }
    );
  }

  resetPassword(data, button, dialog) {
    this._http.post(`${environment.hostAPI}/api/Account/reset-password`, data).subscribe(
      (response) => {
        const serverResponse: { toast: string, id: string } = JSON.parse(response);
        this._toast.success(serverResponse.toast);

        history.replaceState({}, '', '/');

        dialog.close();
        
      },
      err => {
        console.log(err.error)
        if (err.error != null) {
          this._toast.error(err.error);
        }
        else {
          this._toast.error(`Whoops a server ${err.status} error has occurred.`);
        }
        dialog.close();
        this.toggleSignUpButton(button);
      }
    );
  }




  signUp(data, button) {
    this._http.post(`${environment.hostAPI}/api/Account`, data).subscribe(
      response => {
        const serverResponse: { toast: string, id: string } = JSON.parse(response);
        this._toast.success(serverResponse.toast);

        /*
           TODO:
           Hash username instead and save that in the DB on login.
           Return hash to frontend, hash is valid for the session.
           Invalidate hash after x time, using hash is far safer.
           In the mean time don't smite me :D
        */
        sessionStorage.setItem('id', serverResponse.id);

        this._router.navigate(['/account/create-character']);
      },
      err => {
        console.log(err.error)
        if (err.error != null) {
          this._toast.error(err.error);
        }
        else {
          this._toast.error(`Whoops a server ${err.status} error has occurred.`);
        }
        this.toggleSignUpButton(button);
      }
    );
  }

  login(data, button) {
    return this._http.post(`${environment.hostAPI}/api/Account/Login`, data).subscribe(
      response => {
        const serverResponse: { toast: string, id: string } = JSON.parse(response);
        console.log(serverResponse)
        this._toast.success(serverResponse.toast);

        /*
           TODO:
           Hash username instead and save that in the DB on login.
           Return hash to frontend, hash is valid for the session.
           Invalidate hash after x time, using hash is far safer.
           In the mean time don't smite me :D
        */
        sessionStorage.setItem('id', serverResponse.id);

        this._router.navigate(['/account/manage-characters']);
      },
      err => {
        console.log(err)
        if (err.error != null) {
          this._toast.error(err.error);
        }
        else {
          this._toast.error(`Whoops a server ${err.status} error has occurred.`);
        }
        this.toggleSignUpButton(button);
      }
    );
  }


}
