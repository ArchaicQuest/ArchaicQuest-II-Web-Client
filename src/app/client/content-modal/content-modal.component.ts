import { ChangeDetectionStrategy, Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-context-modal',
  templateUrl: './content-modal.component.html',
  styleUrls: ['./content-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ContentModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { name: string, desc: string }, private ngZone: NgZone,) { }
  @ViewChild('autosize', { static: true }) autosize: CdkTextareaAutosize;

  ngOnInit() {
  }

  triggerDescriptionResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  sendToServer(command: string) {

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
