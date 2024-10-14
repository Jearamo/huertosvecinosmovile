import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TesteosPage } from './testeos.page';

const routes: Routes = [
  {
    path: '',
    component: TesteosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TesteosPageRoutingModule {}
