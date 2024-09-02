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
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute, private alertController: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'] || '';
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async cambiarContrasena() {
    if (!this.secretCode.trim() || !this.newPassword.trim() || !this.confirmNewPassword.trim()) {
      await this.mostrarAlerta('Aviso', 'Por favor, llena todos los campos.');
      return;
    }

    if (this.secretCode !== this.expectedSecretCode) {
      await this.mostrarAlerta('Error', 'El código secreto es incorrecto.');
      return;
    }

    if (this.newPassword.length < 8) {
      await this.mostrarAlerta('Error', 'La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      await this.mostrarAlerta('Error', 'La nueva contraseña y la confirmación no coinciden.');
      return;
    }

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