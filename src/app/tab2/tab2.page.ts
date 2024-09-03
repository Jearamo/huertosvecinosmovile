import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  titulo: string = '';
  contenido: string = '';

  constructor(private alertController: AlertController, private router: Router) {}

  async publicar() {
    const tituloTrimmed = this.titulo.trim();
    const contenidoTrimmed = this.contenido.trim();

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
