import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServicebdService } from '../../services/servicebd.service';

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
  readonly expectedSecretCode: string = '12345'; // Código fijo
  showPassword: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private servicebd: ServicebdService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['email'] || '';
      console.log(`Correo recibido: ${this.userEmail}`);  // Log para verificar
    });
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async cambiarContrasena() {
    // Verificar si el código secreto es correcto
    if (this.secretCode !== this.expectedSecretCode) {
      await this.mostrarAlerta('Error', 'El código secreto ingresado es incorrecto.');
      return;
    }

    // Verificar si las contraseñas coinciden
    if (!this.newPassword || this.newPassword !== this.confirmNewPassword) {
      await this.mostrarAlerta('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Actualizar la contraseña en la base de datos
    const resultado = await this.servicebd.cambiarContrasena(this.userEmail, this.newPassword);
    if (resultado) {
      await this.mostrarAlerta('Éxito', 'Tu contraseña ha sido cambiada con éxito.');
      this.router.navigate(['/login']); // Redirigir al login después del cambio
    } else {
      await this.mostrarAlerta('Error', 'Hubo un problema al cambiar la contraseña. Inténtalo nuevamente.');
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
