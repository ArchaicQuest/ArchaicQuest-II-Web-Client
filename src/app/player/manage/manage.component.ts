import { Component, OnInit } from '@angular/core';
import { ManageCharactersService } from './manage.service';
import { Player } from '../Interface/player.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-manage-player-characters',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageCharactersComponent implements OnInit {
    characters: Player[] = [];
    accountId: string;
    isLoading = true;

    constructor(private _service: ManageCharactersService, private _router: Router, private _toast: ToastrService) {
    }



    ngOnInit() {
        this.accountId = sessionStorage.getItem('id');

        if (this.accountId == null) {
            this._router.navigate(['']);
            this._toast.error('You are not authorized to view your account page, please log in.');
            return;
        }

        this._service.GetCharacters(this.accountId).subscribe(
            response => {
                const data = JSON.parse(response);

                this.characters = data.profile.Characters;

                this.characters.sort((a: any, b: any) =>
                    new Date(a.LastLoginTime).getTime() - new Date(b.LastLoginTime).getTime()
                );

                console.log(this.characters);

                this.isLoading = false;

            },
            err => {
                console.log(err);
            }
        );
    }


    trackBy(index: number, item: Player) {
        return item.id;
    }



    PlayCharacter(id: string) {
        this._service.PlayCharacter(id);
    }



}
