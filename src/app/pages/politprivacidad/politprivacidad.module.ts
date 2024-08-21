import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolitprivacidadPageRoutingModule } from './politprivacidad-routing.module';

import { PolitprivacidadPage } from './politprivacidad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolitprivacidadPageRoutingModule
  ],
  declarations: [PolitprivacidadPage]
})
export class PolitprivacidadPageModule {}
