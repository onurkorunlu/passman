import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DecryptModalPageRoutingModule } from './decrypt-modal-routing.module';

import { DecryptModalPage } from './decrypt-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecryptModalPageRoutingModule
  ],
  declarations: [DecryptModalPage]
})
export class DecryptModalPageModule {}
