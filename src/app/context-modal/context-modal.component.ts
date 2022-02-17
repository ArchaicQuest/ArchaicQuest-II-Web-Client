import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client/client.service';

@Component({
  selector: 'app-context-modal',
  templateUrl: './context-modal.component.html',
  styleUrls: ['./context-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContextModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { name: string, desc: string, type: string, canOpen: string, isOpen: boolean, keyword: string }, private service: ClientService) { }

  ngOnInit() {
  }

  sendToServer(command: string) {
    this.service.sendToServer(command);
    this.dialogRef.close();
  }

  public isContainer(type: string) {
    return type === 'Container';
  }

  public canOpen(canOpen: string) {

    console.log("can open ", canOpen)
    return canOpen === 'True'
  }

  public isOpen(isOpen: boolean) {
    return isOpen;
  }

}
