import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  // variables de usuario
  nuevoUsuario = {
    nombreUsuario: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    correo: '',
    contrasena: ''
  };
  confirmarContrasena: string = '';
  // mostrar contraseña
  showPassword: boolean = false;

  constructor(private router: Router,private alertController: AlertController) { }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.querySelector('ion-input[type="password"]') as HTMLIonInputElement;
    passwordInput.type = this.showPassword ? 'text' : 'password';
  }
  // REGISTRO DE USUARIO
  async registrar() {
    // Verificar que las contraseñas coincidan
    if (this.nuevoUsuario.contrasena !== this.confirmarContrasena) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    // Verificar la edad
    if (!this.tieneEdadSuficiente(this.nuevoUsuario.fechaNacimiento)) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes tener al menos 16 años para registrarte',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
  
    // Obtener usuarios existentes o inicializar un array vacío
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Agregar el nuevo usuario
    usuarios.push(this.nuevoUsuario);
    
    // Guardar la lista actualizada de usuarios
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Usuario registrado correctamente',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.router.navigate(['/login']);
        }
      }]
    });
    await alert.present();
  }
  
  tieneEdadSuficiente(fechaNacimiento: string): boolean {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad >= 16;
  }

  ngOnInit() {
  }

}
