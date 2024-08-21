import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaginaperfilPageRoutingModule } from './paginaperfil-routing.module';

import { PaginaperfilPage } from './paginaperfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaginaperfilPageRoutingModule
  ],
  declarations: [PaginaperfilPage]
})
export class PaginaperfilPageModule {}
