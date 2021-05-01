import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from './snack-bar.component';

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(message: string, type: 'success' | 'error', options: any = {}): void {
        const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            data: {
                message,
                type,
            },
            ...options,
        });
        snackBarRef.onAction().subscribe(() => snackBarRef.dismiss());
    }

    showSuccess(message: string, duration: number = 5000) {
        const options = { panelClass: ['snackbar-message--success', 'snackbar-message'], duration };
        this.openSnackBar(message, 'success', options);
    }

    showError(message: string, duration: number = 5000) {
        const options = { panelClass: ['snackbar-message--error', 'snackbar-message'], duration };
        this.openSnackBar(message, 'error', options);
    }
}