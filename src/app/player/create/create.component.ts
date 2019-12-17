import { Component, OnInit } from '@angular/core';
import { CreateService } from './create.service';
import { Race } from '../Interface/race.interface';
import { FormGroup } from '@angular/forms';
import { Data } from 'src/app/_shared/interface/data.interface';

@Component({
    selector: 'app-create-player',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreatePlayerComponent implements OnInit {
    races: Race[];
    raceForm: FormGroup;
    raceHeader: string;
    raceDescription: string;
    weight: number;

    classes: Data[];
    constructor(private service: CreateService) { }

    ngOnInit() {
        this.service.getRace().subscribe(data => {
            this.races = data;
            this.raceHeader = data[0].name;
            this.raceDescription = data[0].description;
        });

        this.service.getClass().subscribe(data => {
            this.classes = data;

        });

        this.raceForm = this.service.raceFormGroup();


        this.raceForm.get('race').valueChanges.subscribe(value => {
            console.log(value);
            this.raceHeader = value.name;
            this.raceDescription = value.description;
        });


    }

    selectRace(race: { id: number, name: string }) {
        this.raceForm.get('race').setValue(race);
    }

}
