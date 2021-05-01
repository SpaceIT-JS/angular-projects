import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
    selector: 'app-snack-bar-component',
    styleUrls: ['snack-bar.component.scss'],
    template: `<div class="snack-bar__content">
        <mat-icon> {{ data.type === 'error' ? 'cancel' : 'check_circle' }} </mat-icon>
        <span [innerHTML]="data.message"></span>
    </div> `,
})
export class SnackBarComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
