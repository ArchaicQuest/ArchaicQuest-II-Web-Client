import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/_shared/http.service';
@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public signUpForm = this._formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    });


    constructor(private _http: HttpService, private _formBuilder: FormBuilder) { }


    signUp(data) {
        this._http.post('http://localhost:57814/api/Account', data);
    }

}
