import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {

  userEmail: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  ngOnInit() {}

  async enviarCodigo() {
    // Verifica si el usuario ingresado es "Jehison1"
    if (this.userEmail === 'Jehison1') {
      await this.mostrarAlerta('Aviso', 'No puedes cambiar la contraseña de este usuario.');
      return;
    }

    // Simulación de verificación de correo electrónico en localStorage
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    if (usuarioActual.correo !== this.userEmail) {
      await this.mostrarAlerta('Error', 'No se encontró un usuario con ese correo electrónico.');
      return;
    }

    // Si el usuario existe y no es "Jehison1", navega a la página de cambio de contraseña con el correo.
    this.router.navigate(['/cambiopassword'], { queryParams: { email: this.userEmail } });
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
