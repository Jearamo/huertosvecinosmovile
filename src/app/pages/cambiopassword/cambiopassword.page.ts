import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cambiopassword',
  templateUrl: './cambiopassword.page.html',
  styleUrls: ['./cambiopassword.page.scss'],
})
export class CambiopasswordPage implements OnInit {

  userEmail: string = '';
  secretCode: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  readonly expectedSecretCode: string = '12345';

  constructor(private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'] || '';
    });
  }

  async cambiarContrasena() {
    if (this.secretCode !== this.expectedSecretCode) {
      await this.mostrarAlerta('Error', 'El código secreto es incorrecto.');
      return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.correo === this.userEmail);

    if (!usuario) {
      await this.mostrarAlerta('Error', 'No se encontró un usuario con ese correo electrónico.');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      await this.mostrarAlerta('Error', 'La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    usuario.contrasena = this.newPassword;
    const index = usuarios.findIndex((u: any) => u.correo === this.userEmail);
    if (index !== -1) {
      usuarios[index] = usuario;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    this.secretCode = '';
    this.newPassword = '';
    this.confirmNewPassword = '';

    await this.mostrarAlerta('Éxito', 'La contraseña se ha cambiado correctamente.');
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
