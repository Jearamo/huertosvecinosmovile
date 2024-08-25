import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  userName: string = '';

  constructor() {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    // Recuperar el usuario actualmente logueado
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual') || '{}');
    
    if (Object.keys(usuarioActual).length > 0) {
      this.userName = usuarioActual.nombreUsuario || '';
      }
  }
  
}
