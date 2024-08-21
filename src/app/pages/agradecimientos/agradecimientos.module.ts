import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgradecimientosPageRoutingModule } from './agradecimientos-routing.module';

import { AgradecimientosPage } from './agradecimientos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgradecimientosPageRoutingModule
  ],
  declarations: [AgradecimientosPage]
})
export class AgradecimientosPageModule {}
