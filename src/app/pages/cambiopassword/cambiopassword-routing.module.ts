import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CambiopasswordPage } from './cambiopassword.page';

const routes: Routes = [
  {
    path: '',
    component: CambiopasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CambiopasswordPageRoutingModule {}
