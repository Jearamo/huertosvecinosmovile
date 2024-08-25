import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiopasswordPageRoutingModule } from './cambiopassword-routing.module';

import { CambiopasswordPage } from './cambiopassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiopasswordPageRoutingModule
  ],
  declarations: [CambiopasswordPage]
})
export class CambiopasswordPageModule {}
