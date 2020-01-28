import { Component, OnInit } from '@angular/core';
import { CreateService } from './create.service';
import { Race } from '../Interface/race.interface';
import { FormGroup } from '@angular/forms';
import { Data } from 'src/app/_shared/interface/data.interface';
import { Player } from '../Interface/player.interface';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
    raceImage: string;
    selectedIndex: number;


    classes: Data[];
    classForm: FormGroup;
    classHeader: string;
    classDescription: string;
    classImage: string;
    selectedClassIndex: number;

    appearanceForm: FormGroup;

    eyeColor: string;
    skinColor: string;
    build: string;
    face: string;
    hairColor: string;
    hairLength: string;
    hairTexture: string;
    facialHair: string;
    gender: string;
    name: string;
    constructor(private service: CreateService) { }

    ngOnInit() {
        this.service.getRace().subscribe(data => {
            this.races = data;
            this.raceHeader = data[0].name;
            this.raceDescription = data[0].description;
        });

        this.service.getClass().subscribe(data => {
            this.classes = data;
            this.classHeader = data[0].name;
            this.classDescription = data[0].description;
        });

        this.raceForm = this.service.raceFormGroup();
        this.classForm = this.service.classFormGroup();
        this.appearanceForm = this.service.appearanceFormGroup();

        this.gender = this.appearanceForm.get('bodyType.gender').value;

        this.raceForm.get('race').valueChanges.subscribe(value => {
            console.log(value);
            this.raceHeader = value.name;
            this.raceDescription = value.description;
            this.raceImage = `/assets/images/character/race/${value.name.replace('-', '').replace(' ', '').toLowerCase()}.png`;
        });

        this.classForm.get('class').valueChanges.subscribe(value => {
            console.log(value);
            this.classHeader = value.name;
            this.classDescription = value.description;
            this.classImage = `/assets/images/character/class/${value.name.replace('-', '').replace(' ', '').toLowerCase()}.png`;
        });

        this.appearanceForm.get('char.name').valueChanges.subscribe(value => {
            this.name = value;
        });
        this.appearanceForm.get('bodyType.body').valueChanges.subscribe(value => {
            this.build = value;
        });
        this.appearanceForm.get('bodyType.gender').valueChanges.subscribe(value => {
            this.gender = value;
        });
        this.appearanceForm.get('bodyType.skinColor').valueChanges.subscribe(value => {
            this.skinColor = value;
        });
        this.appearanceForm.get('facialFeatures.face').valueChanges.subscribe(value => {
            this.face = value;
        });
        this.appearanceForm.get('facialFeatures.eyeColor').valueChanges.subscribe(value => {
            this.eyeColor = value;
        });
        this.appearanceForm.get('hair.hairColor').valueChanges.subscribe(value => {
            this.hairColor = value;
        });
        this.appearanceForm.get('hair.hairTexture').valueChanges.subscribe(value => {
            this.hairTexture = value;
        });
        this.appearanceForm.get('hair.hairLength').valueChanges.subscribe(value => {
            this.hairLength = value;
        });
        this.appearanceForm.get('hair.facialHair').valueChanges.subscribe(value => {
            this.facialHair = value;
        });

    }

    selectRace(race: { id: number, name: string }) {
        this.raceForm.get('race').setValue(race);
    }
    setSelectedRaceIndex(index: number) {
        console.log('selected ', index);
        this.selectedIndex = index;
    }

    selectClass(data: { id: number, name: string }) {
        this.classForm.get('class').setValue(data);
    }
    setSelectedClassIndex(index: number) {
        console.log('selected ', index);
        this.selectedClassIndex = index;
    }

    playGame() {
        const playerInfo: Player = {
            accountId: sessionStorage.getItem('id'),
            id: "00000000-0000-0000-0000-000000000000",
            name: this.name,
            alignmentScore: 0,
            armorRating: {
                armour: 1,
                magic: 1
            },
            attributes: {
                attribute: {
                    Strength: 15,
                    Dexterity: 10,
                    Constitution: 10,
                    Wisdom: 10,
                    Intelligence: 20,
                    Charisma: 20,
                    Hitpoints: 20,
                    Mana: 120,
                    Moves: 20
                }
            },
            className: this.classHeader,
            description: 'Nothing to see here.',
            equipped: {},
            gender: 'Male',
            inventory: [],
            level: '1',
            maxAttributes: {
                attribute: {
                    Strength: 15,
                    Dexterity: 10,
                    Constitution: 10,
                    Wisdom: 10,
                    Intelligence: 20,
                    Charisma: 20,
                    Hitpoints: 20,
                    Mana: 120,
                    Moves: 20
                }
            },
            race: this.raceHeader,
            status: '0',
            stats: {
                hitPoints: 100,
                manaPoints: 100,
                movePoints: 100
            },
            maxStats: {
                hitPoints: 100,
                manaPoints: 100,
                movePoints: 100
            }
        };

        this.service.createCharacter(playerInfo);


    }

}
