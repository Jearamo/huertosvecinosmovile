import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service'; // Asegúrate de importar tu servicio aquí

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  userEmail: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private servicebd: ServicebdService // Agrega el servicio aquí
  ) { }

  ngOnInit() {}

  async enviarCodigo() {
    if (!this.userEmail.trim()) {
      await this.mostrarAlerta('Aviso', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (this.userEmail === 'admin@gmail.com') {
      await this.mostrarAlerta('Aviso', 'No puedes cambiar la contraseña de este usuario.');
      return;
    }

    // Verifica si el usuario existe en la base de datos
    const usuarioExiste = await this.servicebd.buscarUsuarioPorEmail(this.userEmail);
    if (usuarioExiste) {
      // Si existe, navega a la página de cambio de contraseña
      this.router.navigate(['/cambiopassword'], { queryParams: { email: this.userEmail } });
    } else {
      await this.mostrarAlerta('Error', 'No se encontró un usuario con ese correo electrónico.');
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
