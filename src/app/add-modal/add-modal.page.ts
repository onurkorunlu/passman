import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Pass } from '../models/pass';
import { StorageService } from '../services/storage.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.page.html',
  styleUrls: ['./add-modal.page.scss'],
})
export class AddModalPage implements OnInit {

  @Input() passList: Pass[];
  public name: string = '';
  public password: string = '';

  constructor(public modalCtrl:ModalController,public toastController:ToastController, public storageService:StorageService) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  save(){

    if (this.name.length < 3 || this.name.length > 20) {
      this.presentToast('Şifre başlığı 3-20 karakter arasında olmalıdır.');
      return;
    }

    if (this.password.length < 3) {
      this.presentToast('Şifre en az 3 karakter olmalı');
      return;
    }

    if (this.passList == null || this.passList == undefined) {
      this.passList =new Array();
    }

    let profile = this.storageService.getProfile();
    let profilePasswordEnc = CryptoJS.SHA256(profile.password).toString();
    let pass = new Pass();
    pass.name = this.name;
    pass.password = CryptoJS.AES.encrypt(this.password,profilePasswordEnc).toString();
    this.passList.push(pass)
    this.storageService.updatePass(this.passList);
    this.dismiss();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

}
