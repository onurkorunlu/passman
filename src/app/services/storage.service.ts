import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { Pass } from '../models/pass';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  PROFILE_KEY = 'PROFILE'
  PASS = 'PASS'

  constructor() { }

  createProfile(profile: Profile) {
    localStorage.setItem(this.PROFILE_KEY, JSON.stringify(profile))
  }

  getProfile(): Profile {
    return <Profile>JSON.parse(localStorage.getItem(this.PROFILE_KEY))
  }

  deleteProfile() {
    localStorage.removeItem(this.PROFILE_KEY)
  }

  
  private createPass(passList: Pass[]) {
    localStorage.setItem(this.PASS,JSON.stringify(passList));
  }

  updatePass(passList: Pass[]) {
    this.deletePass();
    this.createPass(passList);
  }

  getPass(): Pass[] {
    return <Pass[]>JSON.parse(localStorage.getItem(this.PASS))
  }

  deletePass() {
    localStorage.removeItem(this.PASS)
  }

}
