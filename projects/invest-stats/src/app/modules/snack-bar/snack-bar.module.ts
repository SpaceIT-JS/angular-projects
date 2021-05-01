import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { SnackBarComponent } from './snack-bar.component';
import { SnackBarService } from './snack-bar.service';

@NgModule({
    declarations: [SnackBarComponent],
    imports: [
        BrowserModule,

        MatIconModule,
        MatSnackBarModule
    ],
    providers: [SnackBarService],
    exports: []
})
export class SnackBarModule { }
