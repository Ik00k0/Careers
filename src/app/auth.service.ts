import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage) { }


  /** We have to check for 2 conditions
   * 1 If the user has seen the info page
   * 2 User's logged in status
   * 
   * **/

  seenInfo() {
    return this.storage.get("infoSeen")
  }

  loggedIn() {
    return this.storage.get("loggedIn");
  }
}
