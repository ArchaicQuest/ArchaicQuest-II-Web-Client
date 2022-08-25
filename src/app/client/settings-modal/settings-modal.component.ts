import { ChangeDetectionStrategy, Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ClientService } from '../client.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';

export interface Settings {
  verboseExits:  boolean;
  canFollow:     boolean;
  newbieChannel: boolean;
  gossipChannel: boolean;
  oocChannel:    boolean;
  brief:         boolean;
  autoLoot:      boolean;
  tells:         boolean;
  autoSplit?:     boolean;
  autoSacrifice: boolean;
  autoAssist:    boolean;
  gameFontSize:  number;
  gameFont:      string;
  hints: boolean;
}


@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsModalComponent implements OnInit {
  
  constructor(private clientService: ClientService, private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SettingsModalComponent>, @Inject(MAT_DIALOG_DATA) public data: {  },private http: HttpClient) { }
public fontSize = '--font-size: 16px!important;'
public fontFamily = '--font-family: arial, sans-serif!important;';

public settingsForm = this.formBuilder.group({
  fontSize: [''],
  fontName: [''],
  autoLoot: [false],
  autoAssist: [false],
  autoSacrifice: [false],
  brief: [false],
  canFollow: [false],
  verboseExits: [false],
  newbieChannel: [false],
  gossipChannel: [false],
  oocChannel: [false],
  tells: [false],
  hints: [false],

});

  ngOnInit() {
    
    var id = this.clientService.getConnectionId();
   
    this.http.get(`${environment.hostAPI}/api/player/config/${id}`).pipe(take(1)).subscribe((x: Settings) => {
      
      this.settingsForm.get('verboseExits').setValue(x.verboseExits)
      this.settingsForm.get('autoLoot').setValue(x.autoLoot);
      this.settingsForm.get('autoAssist').setValue(x.autoAssist);
      this.settingsForm.get('autoSacrifice').setValue(x.autoSacrifice);
      this.settingsForm.get('canFollow').setValue(x.canFollow);
      this.settingsForm.get('newbieChannel').setValue(x.newbieChannel);
      this.settingsForm.get('oocChannel').setValue(x.oocChannel);
      this.settingsForm.get('gossipChannel').setValue(x.gossipChannel);
      this.settingsForm.get('tells').setValue(x.tells);
      this.settingsForm.get('brief').setValue(x.brief);
      this.settingsForm.get('fontSize').setValue(x.gameFontSize);
      this.settingsForm.get('fontName').setValue(x.gameFont);
      this.settingsForm.get('hints').setValue(x.hints);

      this.fontSize =  `--font-size: ${x.gameFontSize}px!important;`
      this.fontFamily =  `--font-family: ${x.gameFont}, sans-serif!important;`
  })
  }

  displayFontChange(fontsize: any) {

    this.fontSize =  `--font-size: ${fontsize.target.value}px!important;`
    this.updateCss();
  }

  displayFontTypeChange(font: any) {
    this.fontFamily =  `--font-family: ${font.target.value}, sans-serif!important;`
    this.updateCss();
  }

  updateCss() {
    let css = ['html {'];
      css.push(this.fontSize);
      css.push(this.fontFamily);
    css.push('}');

    document.getElementById('customCSSVars').innerHTML = css.join('');

  }
  
  save() {

   console.log(this.settingsForm.get('fontSize').value)
   
   const config:Settings = {
    autoAssist:this.settingsForm.get('autoAssist').value,
    autoLoot: this.settingsForm.get('autoLoot').value,
    autoSacrifice: this.settingsForm.get('autoSacrifice').value,
    brief: this.settingsForm.get('brief').value,
    canFollow: this.settingsForm.get('canFollow').value,
    gameFont: this.settingsForm.get('fontName').value,
    gameFontSize: this.settingsForm.get('fontSize').value,
    gossipChannel: this.settingsForm.get('gossipChannel').value,
    newbieChannel: this.settingsForm.get('newbieChannel').value,
    oocChannel: this.settingsForm.get('oocChannel').value,
    verboseExits: this.settingsForm.get('verboseExits').value,
    autoSplit: true,
    tells:  this.settingsForm.get('tells').value,
    hints:  this.settingsForm.get('hints').value,

   }
   var id = this.clientService.getConnectionId();
   this.http.post(`${environment.hostAPI}/api/player/config/${id}`, config).pipe(take(1)).subscribe(() => {
    console.log('success')
   })


    this.dialogRef.close();
  }


}
