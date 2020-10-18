import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';
import { AppearanceService } from './appearance.service';
import { Option } from 'src/app/_shared/interface/option.interface';
import { FormGroup } from '@angular/forms';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-player-appearance',
    templateUrl: './appearance.component.html',
    styleUrls: ['./appearance.component.scss']
})
export class PlayerAppearanceComponent implements OnInit {

    @Input()
    form: FormGroup;

    step = 0;
    bodyTypes$: Option[];
    facialTypes$: Option[];
    eyeColorTypes$: Option[];
    skinColorTypes$: Option[];
    hairColorTypes$: Option[];
    hairLengthTypes$: Option[];
    hairTextureTypes$: Option[];
    facialHairTypes$: Option[];
    constructor(private service: AppearanceService) {

    }

    ngOnInit(): void {
        this.bodyTypes$ = this.service.getBodyTypes();
        this.facialTypes$ = this.service.getFaceTypes();
        this.eyeColorTypes$ = this.service.getEyeColorTypes();
        this.skinColorTypes$ = this.service.getSkinColorTypes();
        this.hairColorTypes$ = this.service.getHairColorTypes();
        this.hairLengthTypes$ = this.service.getHairLengthTypes();
        this.hairTextureTypes$ = this.service.getHairTextureTypes();
        this.facialHairTypes$ = this.service.getFacialHairTypes();
    }





    setStep(index: number) {
        this.step = index;
    }

    nextStep() {
        this.step++;
    }

    prevStep() {
        this.step--;
    }



}
