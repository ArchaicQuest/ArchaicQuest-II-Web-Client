import { Component, OnInit } from '@angular/core';
import { ManageCharactersService } from './manage.service';

@Component({
    selector: 'app-manage-player-characters',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageCharactersComponent implements OnInit {

    constructor(private service: ManageCharactersService) { }

    ngOnInit() {

    }





}
