import { Component, OnInit, ElementRef, AfterViewInit, ViewChild, OnDestroy, AfterContentInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { ClientService } from '../client.service';
import { Subscription, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { trigger, style, transition, animate } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { ContextModalComponent } from 'src/app/context-modal/context-modal.component';
import { ContentModalComponent } from '../content-modal/content-modal.component';
import escapeHtml from 'escape-html'
@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    '(window:post-to-server)': 'OnClickSendToServer($event)',
    '(window:open-detail)': 'openDialog($event)'
  },
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.4s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class WindowComponent implements OnInit, AfterContentInit, OnDestroy {
  public windowData: string[];
  public $data: Subscription;
  public componentActive = true;
  private lastKnownScrollPosition = 0
  public items: string[];
  private unsubscribe$ = new Subject<void>();
  userScrolled = false;
  @ViewChild('window', { static: true }) window: ElementRef;

  constructor(private clientService: ClientService, private _snackBar: MatSnackBar, private elRef: ElementRef, public dialog: MatDialog) { }

  ngOnInit() {

    this.clientService.setSettings();

  }

  trackByFn(index, item) {
    return index
  }

  openDialog(x: CustomEvent) {
    this.dialog.open(ContextModalComponent, {
      data: {
        name: x.detail.name,
        desc: x.detail.desc,
        type: x.detail.type,
        keyword: x.detail.keyword,
        canOpen: x.detail.canOpen
      },
      width: '500px'
    });
  }


  OnClickSendToServer(command: CustomEvent) {
    console.log(command)

    this.clientService.sendToServer(command.detail);
  }


  openContentDialog(title: string, desc: string) {
    this.dialog.open(ContentModalComponent, {
      data: {
        name: this.clientService.returnContentPopUp().title,
        desc: this.clientService.returnContentPopUp().description,
        pageNumber: this.clientService.returnContentPopUp().pageNumber,
      },
      width: '750px'
    });
  }




  ngAfterContentInit(): void {

    this.$data = this.clientService.$data.pipe(takeUntil(this.unsubscribe$)).subscribe(x => {

      if (x.length) {
        // if user has scrolled above, show notification of new messages
        // let snackBarRef = this._snackBar.open('new message', 'View', {
        //     duration: 4000
        // });

        console.log(x[x.length - 1])

        if (x[x.length - 1].startsWith("You begin to writing in your book.")) {
          this.openContentDialog("Write Book", "Page");
        }
        this.windowData = x;

       // this.window.nativeElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});

      }
    });


  }

  ngAfterViewChecked() {        
   // this.scrollToBottom();        
} 

scrollToBottom(): void {
    try {
        //this.window.nativeElement.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    } catch(err) { console.log(err)}                 
}


  /**
* Convert color tags into HTML tags.
* @param {string} text
* @param {boolean} escape - when `false`, will not escape HTML before parsing. Defaults to `true`.
* @return {string}
*/
  ParseHtmlColorCodes(text, escape = true) {

    /**
 * The full list of colors.
 */
    const COLORS = 'white|silver|gray|red|maroon|yellow|olive|lime|green|blue|navy|cyan|teal|purple|magenta|gold|orange|darkorange|orangered|brown|dimgray|1|2|3|4|5|6|7|8|9|10|11|12|13|14|15'

    /**
     * The template for the resulting replacement.
     * All class names in outputted HTML will be prefixed.
     * You can change the prefix here. If you do, remember to
     * also adjust the CSS file as well.
     */
    const HTML_REPLACEMENT_TEMPLATE = '<span class="wm$2">$3</span>'

    /**
      * The main Regular Expression for performing replacements.
      */
    const COLOR_RX = new RegExp('({((?:' + COLORS + '))}((?:(?!{(' + COLORS + '|\/)}).)*)({\/})*)', 'gims')


    var escapedText
    if (escape) {
      escapedText = escapeHtml(text)
    } else {
      escapedText = text
    }
    return escapedText.replace(COLOR_RX, HTML_REPLACEMENT_TEMPLATE)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
