import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<boolean> {
  canDeactivate(): boolean {
    if (localStorage.getItem('showFormDataAlert')) {
      if (
        confirm(
          'You have unsaved changes! If you leave, your changes will be lost.'
        )
      ) {
        localStorage.removeItem('showFormDataAlert');
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
