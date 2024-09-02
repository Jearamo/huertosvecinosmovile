import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

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
  fechaNacimiento: Date = new Date(); // Mantén esto como un objeto Date
  editMode: boolean = false;

  // contraseñas
  currentPassword: string = '';
  inputCurrentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as any;
      this.userName = state.userName || '';
      this.userEmail = state.userEmail || '';
      this.nombre = state.nombre || '';
      this.apellido = state.apellido || '';
      this.fechaNacimiento = state.fechaNacimiento ? new Date(state.fechaNacimiento) : new Date();
      this.calcularEdad();
      this.currentPassword = state.password || '';
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
    if (!this.userName || !this.userEmail || !this.nombre || !this.apellido || !this.fechaNacimiento) {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (!this.tieneEdadSuficiente(this.fechaNacimiento)) {
      await this.mostrarAlerta('Error', 'Debes tener al menos 16 años para actualizar el perfil.');
      return;
    }

    await this.mostrarAlerta('Éxito', 'Perfil actualizado correctamente');
    this.toggleEditMode(); // Desactivar el modo de edición después de guardar cambios
  }

  tieneEdadSuficiente(fechaNacimiento: Date): boolean {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad >= 16;
  }

  async cambiarContrasena() {
    if (!this.inputCurrentPassword || !this.newPassword || !this.confirmNewPassword) {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos de la contraseña.');
      return;
    }

    if (this.inputCurrentPassword !== this.currentPassword) {
      await this.mostrarAlerta('Error', 'La contraseña actual es incorrecta.');
      return;
    }

    if (this.newPassword.length < 8) {
      await this.mostrarAlerta('Error', 'La nueva contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      await this.mostrarAlerta('Error', 'La nueva contraseña y la confirmación no coinciden.');
      return;
    }

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