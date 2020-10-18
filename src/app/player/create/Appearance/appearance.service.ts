import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Option } from 'src/app/_shared/interface/option.interface';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class AppearanceService {

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
    });

    constructor(private _http: HttpClient) { }

    checkName(name: string): Observable<boolean> {
        return this._http.get<boolean>(`${environment.hostAPI}/api/player/NameAllowed?name=${name}`);
    }

    getBodyTypes(): Option[] {

        return [{
            id: 0,
            name: 'Normal'
        }, {
            id: 0,
            name: 'Slender'
        },
        {
            id: 0,
            name: 'Wirey'
        },
        {
            id: 0,
            name: 'Broad'
        },
        {
            id: 0,
            name: 'Large'
        },
        {
            id: 0,
            name: 'Muscular'
        },
        {
            id: 0,
            name: 'Heavy'
        },
        {
            id: 0,
            name: 'Light'
        },
        {
            id: 0,
            name: 'Fragile'
        },
        {
            id: 0,
            name: 'Stocky'
        },
        {
            id: 0,
            name: 'Puny'
        },
        {
            id: 0,
            name: 'Athletic'
        },
        {
            id: 0,
            name: 'Voluptuous'
        }];
    }

    getFaceTypes(): Option[] {

        return [{
            id: 0,
            name: 'Ordinary'
        }, {
            id: 0,
            name: 'Round'
        },
        {
            id: 0,
            name: 'Long'
        },
        {
            id: 0,
            name: 'Pleasant'
        },
        {
            id: 0,
            name: 'Plain'
        },
        {
            id: 0,
            name: 'Gentle'
        },
        {
            id: 0,
            name: 'Rugged'
        },
        {
            id: 0,
            name: 'Scary'
        },
        {
            id: 0,
            name: 'Ugly'
        },
        {
            id: 0,
            name: 'Beautiful'
        },
        {
            id: 0,
            name: 'Distinguished'
        },
        {
            id: 0,
            name: 'Chubby'
        },
        {
            id: 0,
            name: 'Chiseled'
        },
        {
            id: 0,
            name: 'Scarred'
        }];
    }

    getEyeColorTypes(): Option[] {

        return [{
            id: 0,
            name: 'Blue'
        }, {
            id: 0,
            name: 'Brown'
        },
        {
            id: 0,
            name: 'Green'
        },
        {
            id: 0,
            name: 'Hazel'
        },
        {
            id: 0,
            name: 'Black'
        },
        {
            id: 0,
            name: 'Gray'
        },
        {
            id: 0,
            name: 'Yellow'
        },
        {
            id: 0,
            name: 'Red'
        },
        {
            id: 0,
            name: 'White'
        },
        {
            id: 0,
            name: 'Exotic'
        },
        {
            id: 0,
            name: 'Amber'
        }];
    }

    getSkinColorTypes(): Option[] {

        return [{
            id: 0,
            name: 'Pale'
        }, {
            id: 0,
            name: 'Light'
        },
        {
            id: 0,
            name: 'Tan'
        },
        {
            id: 0,
            name: 'Brown'
        },
        {
            id: 0,
            name: 'Dark'
        },
        {
            id: 0,
            name: 'Olive'
        },
        {
            id: 0,
            name: 'Exotic'
        },
        {
            id: 0,
            name: 'Black'
        },
        {
            id: 0,
            name: 'Dark Green'
        },
        {
            id: 0,
            name: 'Light Yellow'
        }];
    }

    getHairColorTypes(): Option[] {

        return [{
            id: 0,
            name: 'Bald'
        }, {
            id: 0,
            name: 'Blond'
        },
        {
            id: 0,
            name: 'Light blonde '
        },
        {
            id: 0,
            name: 'Dark blonde'
        },
        {
            id: 0,
            name: 'Strawberry blonde'
        },
        {
            id: 0,
            name: 'Red'
        },
        {
            id: 0,
            name: 'Brown'
        },
        {
            id: 0,
            name: 'Light Brown'
        },
        {
            id: 0,
            name: 'Dark Brown'
        },
        {
            id: 0,
            name: 'Black'
        },
        {
            id: 0,
            name: 'Gray'
        },
        {
            id: 0,
            name: 'Auburn'
        },
        {
            id: 0,
            name: 'White'
        }];
    }

    getHairLengthTypes(): Option[] {

        return [{
            id: 0,
            name: 'Bald'
        }, {
            id: 0,
            name: 'Partly bald'
        },
        {
            id: 0,
            name: 'Crew-cut'
        },
        {
            id: 0,
            name: 'Short'
        },
        {
            id: 0,
            name: 'Close'
        },
        {
            id: 0,
            name: 'Cropped'
        },
        {
            id: 0,
            name: 'Shoulder-length'
        },
        {
            id: 0,
            name: 'Long'
        },
        {
            id: 0,
            name: 'Waist-long'
        }];
    }
    getHairTextureTypes(): Option[] {

        return [{
            id: 0,
            name: 'Bald'
        }, {
            id: 0,
            name: 'Curly'
        },
        {
            id: 0,
            name: 'Straight'
        },
        {
            id: 0,
            name: 'Wavy'
        },
        {
            id: 0,
            name: 'Shaggy'
        },
        {
            id: 0,
            name: 'Dread-locks'
        },
        {
            id: 0,
            name: 'Thick'
        },
        {
            id: 0,
            name: 'Thin'
        },
        {
            id: 0,
            name: 'Messy'
        },
        {
            id: 0,
            name: 'Exotic'
        }];
    }
    getFacialHairTypes(): Option[] {

        return [{
            id: 0,
            name: 'Clean'
        }, {
            id: 0,
            name: 'Shaven'
        },
        {
            id: 0,
            name: 'Short beard'
        },
        {
            id: 0,
            name: 'Long beard'
        },
        {
            id: 0,
            name: 'Goatee'
        },
        {
            id: 0,
            name: 'Mustache'
        },
        {
            id: 0,
            name: 'Beard and mustache'
        },
        {
            id: 0,
            name: 'Stubble'
        },
        {
            id: 0,
            name: 'Sideburns'
        }];
    }
}
