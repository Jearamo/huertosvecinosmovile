import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  userName: string = '';
  userEmail: string = '';
  edad: number = 0;
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';
  constructor(private router: Router) {
    
   }

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
      
    }
  }

  logout(){
    this.router.navigate(['/login']);
  }

  goadmin(){
    this.router.navigate(['/adminpage']);
  }
}
