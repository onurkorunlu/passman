import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DecryptModalPage } from './decrypt-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DecryptModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecryptModalPageRoutingModule {}
