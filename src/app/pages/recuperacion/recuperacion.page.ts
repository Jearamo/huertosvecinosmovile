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
    // Verifica si el campo de correo electrónico está vacío
    if (!this.userEmail.trim()) {
      await this.mostrarAlerta('Aviso', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    // Verifica si el usuario ingresado es "admin@gmail.com"
    if (this.userEmail === 'admin@gmail.com') {
      await this.mostrarAlerta('Aviso', 'No puedes cambiar la contraseña de este usuario.');
      return;
    }

    // Verifica si el usuario ingresado es "juanito@gmail.com"
    if (this.userEmail === 'juanito@gmail.com') {
      // Navega a la página de cambio de contraseña con el correo
      this.router.navigate(['/cambiopassword'], { queryParams: { email: this.userEmail } });
      return;
    }

    // Si el correo electrónico no coincide con ninguno de los valores permitidos, muestra una alerta
    await this.mostrarAlerta('Error', 'No se encontró un usuario con ese correo electrónico.');
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