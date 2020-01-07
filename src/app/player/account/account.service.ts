import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})
export class AccountService {

    public signUpForm = this._formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
    });

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private _http: HttpClient, private _formBuilder: FormBuilder, private _toast: ToastrService) { }


    signUp(data) {
        console.log('post this ', data);
        this._http.post('http://localhost:57814/api/Account', JSON.stringify(data), {
            headers: this.headers,
            responseType: 'text'
        }).subscribe(
            response => {
                this._toast.success(`Account created successfully.`);
            },
            err => this._toast.success(`Something went wrong, try refreshing the page and trying again.`)
        );
    }

}
