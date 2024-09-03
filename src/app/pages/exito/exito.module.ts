import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExitoPageRoutingModule } from './exito-routing.module';

import { ExitoPage } from './exito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExitoPageRoutingModule
  ],
  declarations: [ExitoPage]
})
export class ExitoPageModule {}
