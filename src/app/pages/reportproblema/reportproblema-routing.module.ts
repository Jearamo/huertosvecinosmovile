import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportproblemaPage } from './reportproblema.page';

const routes: Routes = [
  {
    path: '',
    component: ReportproblemaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportproblemaPageRoutingModule {}
