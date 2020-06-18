import { Component, OnInit, Input } from '@angular/core';
import { Pass } from '../models/pass';
import { StorageService } from '../services/storage.service';
import * as CryptoJS from 'crypto-js';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-decrypt-modal',
  templateUrl: './decrypt-modal.page.html',
  styleUrls: ['./decrypt-modal.page.scss'],
})
export class DecryptModalPage implements OnInit {

  @Input() passItem: Pass;
  decryptedPassword: string;
  encPassword: string;

  constructor(public storageService: StorageService, public modelController: ModalController,public toastController:ToastController) { }

  ngOnInit() {
    this.decryptedPassword = 'Şifreniz : ***';
  }

  decryptPassword() {

    let profile = this.storageService.getProfile();

    if (profile.password != this.encPassword) {
      this.presentToast('Profil şifreniz doğru değil.');
      return;
    }

    let profilePasswordEnc = CryptoJS.SHA256(profile.password).toString();
    let bytes = CryptoJS.AES.decrypt(this.passItem.password, profilePasswordEnc);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    this.decryptedPassword = 'Şifreniz : ' + originalText;
  }

  dismiss() {
    this.modelController.dismiss({
      'dismissed': true
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

}
