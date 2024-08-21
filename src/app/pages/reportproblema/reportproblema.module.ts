import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportproblemaPageRoutingModule } from './reportproblema-routing.module';

import { ReportproblemaPage } from './reportproblema.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportproblemaPageRoutingModule
  ],
  declarations: [ReportproblemaPage]
})
export class ReportproblemaPageModule {}
