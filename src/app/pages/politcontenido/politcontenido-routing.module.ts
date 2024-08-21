import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolitcontenidoPage } from './politcontenido.page';

const routes: Routes = [
  {
    path: '',
    component: PolitcontenidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolitcontenidoPageRoutingModule {}
