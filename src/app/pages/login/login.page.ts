import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword: boolean = false;
  correo: string = '';
  contrasena: string = '';

  constructor(private router: Router, private alertController: AlertController, private authService: AuthService) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  async login() {
    if (this.correo.trim() === '' || this.contrasena.trim() === '') {
      await this.presentAlert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    try {
      const isLoggedIn = await this.authService.login(this.correo, this.contrasena);
      if (isLoggedIn) {
        // Redirigir al usuario a la página principal o la siguiente página
        this.router.navigate(['/tabs/tab1']); // Ajusta la ruta según tu aplicación
      }
    } catch (error) {
      // Manejo de errores ya se realiza en el servicio
      console.error('Error de inicio de sesión:', error);
    }
  }

  async pruebas() {
    await this.router.navigate(['/testeos']);
  }

  private async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {}
}