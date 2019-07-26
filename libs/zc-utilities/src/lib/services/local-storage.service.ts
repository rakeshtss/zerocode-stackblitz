import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorageKey = 'ZC';
  constructor() { }
  /**
   * @param any key
   * @param boolean [json] if ture string to json convertion
   * @returns string
   */
  getItem(key, json?: boolean) {
    if (json) {
      return JSON.parse(localStorage.getItem(this.localStorageKey + '_' + key));
    } else {
      return localStorage.getItem(this.localStorageKey + '_' + key);
    }
  }
  /**
   * @param any key
   * @param any data
   * @param boolean [json]
   */
  setItem(key, data, json?: boolean) {
    let result = data;
    if (json) {
      result = JSON.stringify(data);
    }
    localStorage.setItem(this.localStorageKey + '_' + key, result);
  }
  /**
   * @param any key
   */
  removeItem(key) {
    localStorage.removeItem(this.localStorageKey + '_' + key);
  }
  encode(data) {
    // return btoa(data);
    return data;
  }
  decode(data) {
    // return atob(data);
    return data;
  }
}
