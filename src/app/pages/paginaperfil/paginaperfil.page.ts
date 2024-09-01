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
  fechaNacimiento: string = '';
  editMode: boolean = false;
  
  currentPassword: string = '';
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
      this.fechaNacimiento = state.fechaNacimiento || '';
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
    // Implementación para guardar cambios
  }

  async cambiarContrasena() {
    // Implementación para cambiar la contraseña
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