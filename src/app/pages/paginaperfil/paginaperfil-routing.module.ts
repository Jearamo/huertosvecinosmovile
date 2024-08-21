import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaperfilPage } from './paginaperfil.page';

const routes: Routes = [
  {
    path: '',
    component: PaginaperfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginaperfilPageRoutingModule {}
