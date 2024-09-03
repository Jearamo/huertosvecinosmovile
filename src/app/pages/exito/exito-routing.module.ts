import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExitoPage } from './exito.page';

const routes: Routes = [
  {
    path: '',
    component: ExitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExitoPageRoutingModule {}
