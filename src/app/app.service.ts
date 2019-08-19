import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';

@Injectable({
    providedIn: 'root'
})
export class AppService {
   // private host = environment.hostAPI;



    constructor(private http: HttpClient) { }




}
