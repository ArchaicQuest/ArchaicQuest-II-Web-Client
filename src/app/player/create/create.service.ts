import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Race } from '../Interface/race.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateService {

    public createPlayerForm = this.formBuilder.group({
        id: [''],
        name: ['', Validators.required],
    });

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private http: HttpClient, private formBuilder: FormBuilder) { }

    getRace(): Observable<Race[]> {
        return this.http.get<Race[]>('http://localhost:57814/api/Character/Race');
    }



}
