import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PolitprivacidadPage } from './politprivacidad.page';

const routes: Routes = [
  {
    path: '',
    component: PolitprivacidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolitprivacidadPageRoutingModule {}
