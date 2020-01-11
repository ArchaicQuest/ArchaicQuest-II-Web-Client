import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private _http: HttpClient) { }

    post<T>(url: string, data: T): Observable<any> {
        return this._http.post(url, JSON.stringify(data), {
            headers: this.headers,
            responseType: 'text'
        });
    }

}
