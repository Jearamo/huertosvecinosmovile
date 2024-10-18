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
  readonly expectedSecretCode: string = '12345';
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute, private alertController: AlertController, private servicebd: ServicebdService, private router: Router) { }

  ngOnInit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async cambiarContrasena() {
    if (!this.userEmail.trim()) {
      await this.mostrarAlerta('Aviso', 'Por favor, ingresa tu correo electrónico.');
      return;
    }
  
    console.log(`Buscando usuario con email: ${this.userEmail}`); // Log para depuración
  
    const usuarioExiste = await this.servicebd.buscarUsuarioPorEmail(this.userEmail);
    console.log(`Usuario encontrado: ${usuarioExiste}`); // Log para depuración
  
    if (usuarioExiste) {
      await this.mostrarAlerta('Éxito', 'Puedes proceder a cambiar la contraseña.');
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