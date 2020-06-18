import { Component } from '@angular/core';
import { Pass } from '../models/pass';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ModalController, ToastController } from '@ionic/angular';
import { AddModalPage } from '../add-modal/add-modal.page';
import * as CryptoJS from 'crypto-js';
import { DecryptModalPage } from '../decrypt-modal/decrypt-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string;
  passList: Pass[] = new Array();

  constructor(public router: Router, public storageService: StorageService, public modalController: ModalController, public toastController: ToastController) {

    let profile = storageService.getProfile();
    if (profile == null || profile == undefined) {
      this.router.navigate(['profile']);
    }
    this.username = profile.username;

    let passList = storageService.getPass();
    if (passList != null && passList != undefined) {
      this.passList = passList;
    }

  }

  decrypt(pass: Pass) {
    let profile = this.storageService.getProfile();
    return CryptoJS.AES.decrypt(pass.password, profile.password.trim()).toString(CryptoJS.enc.Utf8);
  }

  async showAddModal() {
    const modal = await this.modalController.create({
      component: AddModalPage,
      componentProps: {
        'passList': this.passList,
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async showDecryptModal(pass: Pass) {
    const modal = await this.modalController.create({
      component: DecryptModalPage,
      componentProps: {
        'passItem': pass,
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async deleteToast(pass: Pass) {
    const toast = await this.toastController.create({
      message: '\"' +pass.name + '\" şifresini silmek istediğinize emin misiniz ?',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          role: 'cancel',
          icon: 'close-outline',
          text: 'İPTAL',
          handler: () => {
          }
        }, {
          text: 'SİL',
          icon: 'trash-outline',
          handler: () => {
            this.deletePass(pass);
          }
        }
      ]
    });
    toast.present();
  }

  async deleteProfileToast() {
    const toast = await this.toastController.create({
      message: 'Profiliniz silinecek emin misiniz? Not: Profilinizi silmeniz halinde tüm şifreleriniz silinecektir.',
      position: 'bottom',
      buttons: [
        {
          side: 'start',
          role: 'cancel',
          icon: 'close-outline',
          text: 'İPTAL',
          handler: () => {
          }
        }, {
          text: 'SİL',
          icon: 'trash-outline',
          handler: () => {
            this.storageService.deletePass();
            this.storageService.deleteProfile();
            location.reload();
          }
        }
      ]
    });
    toast.present();
  }

  deletePass(pass: Pass) {
    const index = this.passList.indexOf(pass, 0);
    if (index > -1) {
      this.passList.splice(index, 1);
    }
    this.storageService.updatePass(this.passList);
  }
}
