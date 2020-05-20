import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Race } from '../Interface/race.interface';
import { Data } from 'src/app/_shared/interface/data.interface';
import { environment } from 'src/environments/environment';
import { ManageCharactersService } from '../manage/manage.service';

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

    constructor(private _http: HttpClient, private _formBuilder: FormBuilder, private _service: ManageCharactersService, ) { }

    getRace(): Observable<Race[]> {
        return this._http.get<Race[]>(`${environment.hostAPI}/api/Character/Race`);
    }

    getClass(): Observable<Data[]> {
        return this._http.get<Data[]>(`${environment.hostAPI}/api/Character/Class`);
    }

    createCharacter(data) {
        console.log('post this ', data);
        this._http.post(`${environment.hostAPI}/api/Character/Player`, JSON.stringify(data), {
            headers: this.headers,
            // responseType: 'text'
        }).subscribe(
            (response: string) => {
                this._service.PlayCharacter(response);
            },
            err => console.log(err)
        );
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

    appearanceFormGroup(): FormGroup {

        return this._formBuilder.group({
            char: this._formBuilder.group({
                name: ['', Validators.required],
            }),
            bodyType: this._formBuilder.group({
                body: ['', Validators.required],
                skinColor: ['', Validators.required],
                gender: ['', Validators.required],
            }),
            facialFeatures: this._formBuilder.group({
                face: ['', Validators.required],
                eyeColor: ['', Validators.required],
            }),
            hair: this._formBuilder.group({
                hairColor: ['', Validators.required],
                hairTexture: ['', Validators.required],
                hairLength: ['', Validators.required],
                facialHair: ['', Validators.required],
            })
        });
    }



}
