import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

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
  validEmail: string = 'admin@gmail.com';
  validPassword: string = 'admin1234';

  constructor(private router: Router, private alertController: AlertController, private navCtrl: NavController ) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }

  async login() {
    // Verificar el usuario predefinido
    if (this.correo === this.validEmail && this.contrasena === this.validPassword) {
      localStorage.setItem('usuarioActual', JSON.stringify({
        nombreUsuario: 'Usuario administrador',
        correo: this.validEmail,
        nombre: 'Jehison',
        apellido: 'Arancibia',
        fechaNacimiento: '1990-01-01',
        contrasena: this.validPassword,
        validAdmin: true
      }));
      this.navCtrl.navigateRoot('/tabs/tab1', { animated: false }).then(() => {
        window.location.reload();
      });
      return;
    }

    // Verificar usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find(
      (u: any) => u.correo === this.correo && u.contrasena === this.contrasena
    );

    if (usuarioEncontrado) {
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioEncontrado));
      this.router.navigate(['/tabs/tab1']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {
  }
}