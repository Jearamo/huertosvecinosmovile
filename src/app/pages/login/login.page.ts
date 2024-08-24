import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // Mostrar contraseña
  showPassword: boolean = false;
  // verificar inicio 
  correo: string = '';
  contrasena: string = '';

  validEmail: string = 'Jehison';
  validPassword: string = 'admin123';

  constructor(private router: Router, private alertController: AlertController) { }
  // MOSTRAR CONTRASEÑA
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  // IF PARA INICIO DE SESIÓN
  async login() {
    if (this.correo === this.validEmail && this.contrasena === this.validPassword) {
      // VÁLIDO
      this.router.navigate(['/tabs/tab1']); // DIRIGE A LA PRINCIPAL
    } else {
      // INVÁLIDO
      const alert = await this.alertController.create({
        header: 'Inicio de sesión fallido',
        message: 'Correo o contraseña inválidos. Por favor, intente de nuevo.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {
  }

}
