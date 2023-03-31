import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Race } from '../Interface/race.interface';
import { Data } from 'src/app/_shared/interface/data.interface';
import { environment } from 'src/environments/environment';
import { ManageCharactersService } from '../manage/manage.service';
import { AppearanceService } from './Appearance/appearance.service';

@Injectable({
  providedIn: 'root'
})
export class CreateService {

  private validationTimeout: any;
  public createPlayerForm = this._formBuilder.group({
    id: [''],
    name: ['', Validators.required, Validators.maxLength(50),
      Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]*$')],
  });

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient, private _formBuilder: FormBuilder, private _service: ManageCharactersService, private _appearanceService: AppearanceService) { }

  getRace(): Observable<Race[]> {
    return this._http.get<Race[]>(`${environment.hostAPI}/api/Character/Race`);
  }

  getClass(): Observable<Data[]> {
    return this._http.get<Data[]>(`${environment.hostAPI}/api/Character/Class`);
  }


  createCharacter(data) {

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


  validateName(c: FormControl) {

    try {
      return this.nameAvailable(c.value);
    }
    catch(ex) {
      console.log(ex)
    }
    return false;
  }
  nameAvailable(name: string) {
    clearTimeout(this.validationTimeout);
    return new Promise((resolve) => {
      this.validationTimeout = setTimeout(() => {
        let req = this._appearanceService.checkName(name);

        req.subscribe({
          next: (result) => {
            console.log("results", result)
            if (result) {
              return resolve(null)
            }
            else {
              return resolve({ name: result })
            }
          },
          error: (e) => {
            console.log("results", e)
            resolve(null)
          
          },
          complete: () => {
           
          }
      })
      
    });
  })}


  appearanceFormGroup(): FormGroup {

    return this._formBuilder.group({
      char: this._formBuilder.group({
        name: ['', Validators.required, this.validateName.bind(this)],
        gender: ['Male', Validators.required],
      }),
      bodyType: this._formBuilder.group({
        body: ['', Validators.required],
        skinColor: ['', Validators.required],

      }),
      facialFeatures: this._formBuilder.group({
        face: ['', Validators.required],
        eyeColor: ['', Validators.required],
      }),
      hair: this._formBuilder.group({
        hairColor: ['', Validators.required],
        hairTexture: ['', Validators.required],
        hairLength: ['', Validators.required],
        facialHair: ['',],
      })
    });
  }



}
