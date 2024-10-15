import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  titulo: string = '';
  contenido: string = '';

  constructor(private alertController: AlertController, private router: Router, private messageService: MessageService) {}

  ngOnInit() {
    // Limpiar mensajes al entrar en la página
    this.messageService.clearMessages();
  }

  async publicar() {
    this.messageService.clearMessages(); // Limpiar mensajes anteriores
    const tituloTrimmed = this.titulo.trim();
    const contenidoTrimmed = this.contenido.trim();

    // Validar longitud mínima
    if (tituloTrimmed.length < 5) {
      this.messageService.addMessage({ type: 'error', text: 'El título debe tener al menos 5 caracteres.' });
      return;
    }

    if (contenidoTrimmed.length < 5) {
      this.messageService.addMessage({ type: 'error', text: 'El contenido debe tener al menos 5 caracteres.' });
      return;
    }

    // Validar campos vacíos
    if (!tituloTrimmed || !contenidoTrimmed) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, rellene todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      console.log('Título:', tituloTrimmed);
      console.log('Contenido:', contenidoTrimmed);
      this.router.navigate(['/exito']);
    }
  }
}
