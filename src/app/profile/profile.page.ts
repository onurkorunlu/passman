import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Profile } from '../models/profile';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public username: string = '';
  public password: string = '';

  constructor(public router:Router, public toastController: ToastController,public storageService:StorageService) { }

  ngOnInit() {
  }

  save() {

    if (this.username.length < 3 || this.username.length > 20) {
      this.presentToast('Kullanıcı adı 3-20 karakter arasında olmalı');
      return;
    }

    if (this.password.length < 3) {
      this.presentToast('Şifre en az 3 karakter olmalı');
      return;
    }

    let profile = new Profile();
    profile.username = this.username;
    profile.password = this.password;
    this.storageService.createProfile(profile);
    this.router.navigate(['']);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

}
