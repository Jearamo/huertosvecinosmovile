import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcuerdousuarioPage } from './acuerdousuario.page';

const routes: Routes = [
  {
    path: '',
    component: AcuerdousuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcuerdousuarioPageRoutingModule {}
