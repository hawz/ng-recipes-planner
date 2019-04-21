/**
 *
 *                  UI Service
 *
 * The UIService is a simple class responsible for showing a snackBox message
 * in the bottom of the page and handling the loading spinner state.
 *
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class UIService {
  /**
   * the loadingStateChanged subject to which external components will subscribe in order to display / hide
   * the loading spinner and on which services dispatch events calling next() whenever an API call is performed.
   */
  loadingStateChanged = new Subject<boolean>();

  /**
   * @param snackBar the snackBar service provided by angular material
   */
  constructor(private snackBar: MatSnackBar) { }

  /**
   * @param message the message to show in the snackbar
   * @param action the label for the snackbar action
   * @param duration the length of time in milliseconds to wait before automatically dismissing the snack bar
   */
  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration
    });
  }
}
