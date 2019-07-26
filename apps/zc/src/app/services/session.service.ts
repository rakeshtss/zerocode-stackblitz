import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@zc-ui/zc-utilities';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  sessionObj: any;
  constructor(private ls: LocalStorageService, private router: Router) {}
  /**
   *
   *
   * @returns boolean
   */
  checkSession(): boolean {
    this.sessionObj = this.ls.getItem('session', true);
    if (this.sessionObj) {
      return true;
    }
    return false;
  }
  /**
   *
   * creat a cookies when login true
   * @param any sessionObj
   */
  setSession(sessionObj) {
    this.ls.setItem('session', sessionObj, true);
    // this.sessionObj
  }
  /**
   *
   *
   * @returns sessionObj (logged in user details)
   */
  getSession() {
    this.sessionObj = this.ls.getItem('session', true);
    return this.sessionObj;
  }
  getToken() {
    this.sessionObj = this.ls.getItem('session', true);
    if (this.sessionObj) {
      return this.sessionObj.token;
    }
  }
  /**
   *
   * Remove session cookies
   */
  clearSession() {
    this.ls.removeItem('session');
  }
  /**
   *
   * Clear cookies and redirect to login page when session expired
   */
  sessionExpired() {
    this.ls.removeItem('user');
    this.router.navigate(['/']);
  }
}
