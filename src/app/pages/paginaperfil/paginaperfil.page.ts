import { Component, OnInit } from '@angular/core';
import { userName } from '../../tab1/tab1.page';

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
  constructor() { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }
  cargarDatosUsuario() {
    // Recuperar el usuario actualmente logueado
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    
    if (Object.keys(usuarioActual).length > 0) {
      this.userName = usuarioActual.nombreUsuario || '';
      this.userEmail = usuarioActual.correo || '';
      this.nombre = usuarioActual.nombre || '';
      this.apellido = usuarioActual.apellido || '';
      this.fechaNacimiento = usuarioActual.fechaNacimiento || '';
      
      // Calcular la edad
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
  }

}
