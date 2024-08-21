import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CentroayudaPageRoutingModule } from './centroayuda-routing.module';

import { CentroayudaPage } from './centroayuda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CentroayudaPageRoutingModule
  ],
  declarations: [CentroayudaPage]
})
export class CentroayudaPageModule {}
