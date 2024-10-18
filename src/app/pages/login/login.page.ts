import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { MessageService } from './../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  showPassword: boolean = false;
  correo: string = '';
  contrasena: string = '';
  private formClearSubscription: Subscription | null = null; // Inicializar con null

  constructor(
    private router: Router, 
    private alertController: AlertController, 
    private authService: AuthService, 
    private formService: MessageService
  ) {}

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
        this.router.navigate(['/tabs/tab1']); // Ajusta la ruta según tu aplicación
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  }

  // Método para navegar a la página de testeos
  async pruebas() {
    await this.router.navigate(['/testeos']); // Ajusta la ruta según tu aplicación
  }

  ngOnInit() {
    this.formClearSubscription = this.formService.formCleared$.subscribe(() => {
      this.clearForm(); // Limpiar el formulario cuando se recibe la notificación
    });
  }

  ngOnDestroy() {
    if (this.formClearSubscription) {
      this.formClearSubscription.unsubscribe(); // Limpiar la suscripción
    }
  }

  private async presentAlert(header: string, message: string): Promise<void> {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  clearForm() {
    this.correo = ''; // Limpiar el campo de correo
    this.contrasena = ''; // Limpiar el campo de contraseña
  }
}
