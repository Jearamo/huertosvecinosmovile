import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PolitcontenidoPageRoutingModule } from './politcontenido-routing.module';

import { PolitcontenidoPage } from './politcontenido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolitcontenidoPageRoutingModule
  ],
  declarations: [PolitcontenidoPage]
})
export class PolitcontenidoPageModule {}
