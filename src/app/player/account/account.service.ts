import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/_shared/http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public signUpForm = this._formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3)]],
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

    signUp(data, button) {
        this._http.post('http://localhost:57814/api/Account', data).subscribe(
            response => {
                this._toast.success(response);
                this._router.navigate(['/account/create-character']);
            },
            err => {
                this._toast.error(err.error);
                this.toggleSignUpButton(button);
            }
        );
    }




}
