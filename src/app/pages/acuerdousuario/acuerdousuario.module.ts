import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcuerdousuarioPageRoutingModule } from './acuerdousuario-routing.module';

import { AcuerdousuarioPage } from './acuerdousuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcuerdousuarioPageRoutingModule
  ],
  declarations: [AcuerdousuarioPage]
})
export class AcuerdousuarioPageModule {}
