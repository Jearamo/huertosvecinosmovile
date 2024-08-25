import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-paginaperfil',
  templateUrl: './paginaperfil.page.html',
  styleUrls: ['./paginaperfil.page.scss'],
})
export class PaginaperfilPage implements OnInit {
  userName: string = '';
  userEmail: string = '';
  edad: number = 0;
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';
  editMode: boolean = false;
  
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private alertController: AlertController) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    
    if (Object.keys(usuarioActual).length > 0) {
      this.userName = usuarioActual.nombreUsuario || '';
      this.userEmail = usuarioActual.correo || '';
      this.nombre = usuarioActual.nombre || '';
      this.apellido = usuarioActual.apellido || '';
      this.fechaNacimiento = usuarioActual.fechaNacimiento || '';
      
      this.calcularEdad();
    }
  }

  calcularEdad() {
    if (this.fechaNacimiento) {
      const hoy = new Date();
      const fechaNac = new Date(this.fechaNacimiento);
      this.edad = hoy.getFullYear() - fechaNac.getFullYear();
      const m = hoy.getMonth() - fechaNac.getMonth();
      if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
        this.edad--;
      }
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  async guardarCambios() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    usuarioActual.nombreUsuario = this.userName;
    usuarioActual.nombre = this.nombre;
    usuarioActual.apellido = this.apellido;
    usuarioActual.fechaNacimiento = this.fechaNacimiento;

    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

    const index = usuarios.findIndex((u: any) => u.correo === this.userEmail);
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...usuarioActual };
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    this.calcularEdad();
    this.editMode = false;

    await this.mostrarAlerta('Éxito', 'Perfil actualizado correctamente');
  }

  async cambiarContrasena() {
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (this.currentPassword !== usuarioActual.contrasena) {
      await this.mostrarAlerta('Error', 'La contraseña actual es incorrecta.');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      await this.mostrarAlerta('Error', 'La nueva contraseña y la confirmación no coinciden.');
      return;
    }

    usuarioActual.contrasena = this.newPassword;
    localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual));

    const index = usuarios.findIndex((u: any) => u.correo === this.userEmail);
    if (index !== -1) {
      usuarios[index].contrasena = this.newPassword;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';

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