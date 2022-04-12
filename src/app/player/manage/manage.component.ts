
import { ManageCharactersService } from './manage.service';
import { Player } from '../Interface/player.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-player-characters',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageCharactersComponent implements OnInit {
  characters: Player[] = [];
  accountId: string;
  isLoading = true;
  totalPlayingHours = 0;
  totalKills = 0;
  totalDeaths = 0;
  additednessRating = "";

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
          new Date(b.LastLoginTime).getTime() - new Date(a.LastLoginTime).getTime()
        );

        this.characters.forEach(char => {

          this.totalPlayingHours += char['PlayTime'];
          this.totalKills += char.MobKills;
          this.totalDeaths += char.MobDeaths;


        });

        this.totalPlayingHours = Math.floor(this.totalPlayingHours / 60);
        this.setAddictedText(this.totalPlayingHours)
        console.log(this.totalPlayingHours)



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

  setAddictedText(hours: number) {
    if (hours < 15) {
      this.additednessRating = 'Neophyte, learning the ropes.'
    }
    else
      if (hours < 30) {
        this.additednessRating = 'I\'m starting to get into this...'
      }
      else
        if (hours < 45) {
          this.additednessRating = 'A week is long time in the realm of ArchaicQuest.'
        }
        else
          if (hours < 60) {
            this.additednessRating = 'Just one more level.'
          }
          else
            if (hours < 75) {
              this.additednessRating = 'Repetitive Strain Injury anyone?'
            }
            else
              if (hours < 90) {
                this.additednessRating = 'Remember to call your work and ask for more sick leave.'
              }
              else
                if (hours < 105) {
                  this.additednessRating = 'Remember, eating gives you the strength to keep on playing.'
                }
                else
                  if (hours < 120) {
                    this.additednessRating = 'No-one can accuse you of a lacking commitment.'
                  }
                  else
                    if (hours < 135) {
                      this.additednessRating = 'Time to change your underwear.'
                    }
                    else
                      if (hours < 150) {
                        this.additednessRating = 'It\'s not really addictive, I just can\'t stop playing...'
                      }
                      else
                        if (hours < 180) {
                          this.additednessRating = 'Sleeping is for wimps.'
                        }
                        else
                          if (hours < 195) {
                            this.additednessRating = 'Time to order another takeaway pizza.'
                          }
                          else
                            if (hours < 210) {
                              this.additednessRating = 'Your Relationship has expired.'
                            }
                            else
                              if (hours < 225) {
                                this.additednessRating = 'What are humans?'
                              }
                              else
                                if (hours < 240) {
                                  this.additednessRating = 'Turning your underwear inside out saves on washing.'
                                }
                                else
                                  if (hours < 255) {
                                    this.additednessRating = 'I can give up this game whenever i like. Just dont want to yet...'
                                  }

  }



}
