import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TesteosPageRoutingModule } from './testeos-routing.module';

import { TesteosPage } from './testeos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TesteosPageRoutingModule
  ],
  declarations: [TesteosPage]
})
export class TesteosPageModule {}
