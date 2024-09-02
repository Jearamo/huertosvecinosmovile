import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword: boolean = false;
  correo: string = '';
  contrasena: string = '';

  // Usuario admin
  adminName: string = 'Administrador';
  adminApellido: string = 'ApellidoAdmin';
  adminNombre: string = 'NombreAdmin';
  adminNaci: string = '01/01/1980';
  validEmail: string = 'admin@gmail.com';
  validPassword: string = 'admin1234';

  // Usuario normal (ejemplo)
  userName: string = 'Juanito';
  usuarioApellido: string = 'Perez';
  usuarioNombre: string = 'Juan';
  usuarioNaci: string = '01/01/2000';
  normalEmail: string = 'juanito@gmail.com';
  normalPassword: string = 'juanito123';

  constructor(private router: Router, private alertController: AlertController) { }

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
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.correo === this.validEmail && this.contrasena === this.validPassword) {
      this.router.navigate(['/tabs/tab1'], {
        state: {
          userName: this.adminName,
          userEmail: this.validEmail,
          nombre: this.adminNombre,
          apellido: this.adminApellido,
          fechaNacimiento: this.adminNaci,
          password: this.validPassword
        }
      });
    } else if (this.correo === this.normalEmail && this.contrasena === this.normalPassword) {
      this.router.navigate(['/tabs/tab1'], {
        state: {
          userName: this.userName,
          userEmail: this.normalEmail,
          nombre: this.usuarioNombre,
          apellido: this.usuarioApellido,
          fechaNacimiento: this.usuarioNaci,
          password: this.normalPassword
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() { }
}