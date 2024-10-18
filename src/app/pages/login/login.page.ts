import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    if (!this.correo.trim() || !this.contrasena.trim()) {
      const alert = await this.alertController.create({
        header: 'Campos vacíos',
        message: 'Por favor, rellena todos los campos',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  
    try {
      const loginSuccess = await this.authService.login(this.correo, this.contrasena);
      if (loginSuccess) {
        this.router.navigate(['/tabs/tab1']);
      }
    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error?.message || 'Error al iniciar sesión',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  
  
  

  async pruebas() {
    await this.router.navigate(['/testeos']);
  }

  ngOnInit() {}
}