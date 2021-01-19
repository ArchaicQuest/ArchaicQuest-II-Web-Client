import { Directive, AfterViewInit, OnDestroy, Optional, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material';


@Directive({ selector: '[tab-directive]' })
export class TabDirective {
    observable: any;
    constructor(@Optional() private autoTrigger: MatAutocompleteTrigger, @Optional() private control: NgControl) { }

    @HostListener('keydown.tab', ['$event.target']) onBlur() {
        if (this.autoTrigger.activeOption) {
            this.autoTrigger.writeValue(this.autoTrigger.activeOption.value)
            //this.autoTrigger._handleFocus();
        }
    }

    ngAfterViewInit() {
        this.observable = this.autoTrigger.panelClosingActions.subscribe(x => {
            if (this.autoTrigger.activeOption) {
                const value = this.autoTrigger.activeOption.value;
                if (this.control)
                    this.control.control.setValue(value, { emit: false });
                this.autoTrigger.writeValue(value);
            }
        })
    }

}