import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private _http: HttpClient, private _toast: ToastrService) { }

    post(url, data) {
        this._http.post(url, JSON.stringify(data), {
            headers: this.headers,
            responseType: 'text'
        }).subscribe(
            response => {
                console.log(response)
                this._toast.success(`Account created successfully.`);
            },
            err => {
                this._toast.error(err.error);
            }
        );
    }

}
