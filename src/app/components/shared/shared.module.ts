import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from '../message/message.component'; // Asegúrate de que la ruta sea correcta
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [MessagesComponent],
  imports: [CommonModule, IonicModule],
  exports: [MessagesComponent] // Exporta el componente para que otros módulos puedan usarlo
})
export class SharedModule {}
