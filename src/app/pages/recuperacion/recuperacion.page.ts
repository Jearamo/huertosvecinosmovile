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
    if (!this.userEmail.trim()) {
      await this.mostrarAlerta('Aviso', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (this.userEmail === 'admin@gmail.com') {
      await this.mostrarAlerta('Aviso', 'No puedes cambiar la contraseña de este usuario.');
      return;
    }

    if (this.userEmail === 'juanito@gmail.com') {
      this.router.navigate(['/cambiopassword'], { queryParams: { email: this.userEmail } });
      return;
    }

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