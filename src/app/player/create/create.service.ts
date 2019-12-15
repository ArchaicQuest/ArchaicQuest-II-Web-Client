import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Race } from '../Interface/race.interface';
import { Data } from 'src/app/_shared/interface/data.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateService {

    public createPlayerForm = this._formBuilder.group({
        id: [''],
        name: ['', Validators.required],
    });

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private _http: HttpClient, private _formBuilder: FormBuilder) { }

    getRace(): Observable<Race[]> {
        return this._http.get<Race[]>('http://localhost:57814/api/Character/Race');
    }

    getClass(): Observable<Data[]> {
        return this._http.get<Data[]>('http://localhost:57814/api/Character/Class');
    }

    raceFormGroup(): FormGroup {

        return this._formBuilder.group({
            race: ['', Validators.required]
        });
    }

    classFormGroup(): FormGroup {

        return this._formBuilder.group({
            class: ['', Validators.required]
        });
    }



}
