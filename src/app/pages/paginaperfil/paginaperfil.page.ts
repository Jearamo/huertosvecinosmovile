import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { ServicebdService } from '../../services/servicebd.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-paginaperfil',
  templateUrl: './paginaperfil.page.html',
  styleUrls: ['./paginaperfil.page.scss'],
})
export class PaginaperfilPage implements OnInit {
  userName: string = '';
  userEmail: string = '';
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: Date = new Date();
  edad: number = 0;
  editMode: boolean = false;

  // contraseñas
  currentPassword: string = '';
  inputCurrentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private alertController: AlertController, 
    private authService: AuthService,
    private servicebd: ServicebdService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userName = user.nick_name || ''; 
        this.userEmail = user.email || '';
        this.nombre = user.nombre || '';
        this.apellido = user.apellido || '';
        this.fechaNacimiento = user.fechaNacimiento ? new Date(user.fechaNacimiento) : new Date();
        this.calcularEdad();
      }
    });
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
    // Validaciones
    if (!this.userName || !this.userEmail || !this.nombre || !this.apellido || !this.fechaNacimiento) {
      await this.mostrarAlerta('Error', 'Por favor, complete todos los campos.');
      return;
    }

    if (!this.tieneEdadSuficiente(this.fechaNacimiento)) {
      await this.mostrarAlerta('Error', 'Debes tener al menos 13 años para actualizar el perfil.');
      return;
    }

    // Intentar actualizar en la base de datos
    const actualizado = await this.servicebd.actualizarDatosUsuario({
      userName: this.userName,
      userEmail: this.userEmail,
      nombre: this.nombre,
      apellido: this.apellido,
      fechaNacimiento: this.fechaNacimiento.toISOString().slice(0, 10) // Formato correcto para la BD
    });

    if (actualizado) {
      await this.mostrarAlerta('Éxito', 'Perfil actualizado correctamente');
      this.toggleEditMode();
    } else {
      await this.mostrarAlerta('Error', 'Hubo un problema al actualizar el perfil.');
    }
  }

  tieneEdadSuficiente(fechaNacimiento: Date): boolean {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const m = hoy.getMonth() - fechaNac.getMonth();
    
    if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    
    return edad >= 13;
  }

  async cambiarContrasena() {
    // Validaciones de la contraseña
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

    // Intentar cambiar la contraseña en la base de datos
    const passwordActualizada = await this.servicebd.cambiarContrasena(this.userEmail, this.newPassword);

    if (passwordActualizada) {
      await this.mostrarAlerta('Éxito', 'La contraseña se ha cambiado correctamente.');
      this.newPassword = '';
      this.confirmNewPassword = '';
      this.inputCurrentPassword = '';
    } else {
      await this.mostrarAlerta('Error', 'Hubo un problema al cambiar la contraseña.');
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
