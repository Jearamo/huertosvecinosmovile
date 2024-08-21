import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginacrearPage } from './paginacrear.page';

const routes: Routes = [
  {
    path: '',
    component: PaginacrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaginacrearPageRoutingModule {}
