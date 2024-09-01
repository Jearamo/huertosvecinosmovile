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
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as any;
      this.userName = state.userName || 'Usuario';
      this.userEmail = state.userEmail || '';
      this.nombre = state.nombre || '';
      this.apellido = state.apellido || '';
      this.fechaNacimiento = state.fechaNacimiento || '';
    }
  }

  goToPerfil() {
    this.router.navigate(['/paginaperfil'], {
      state: {
        userName: this.userName,
        userEmail: this.userEmail,
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento
      }
    });
  }

  goadmin() {
    // Navegar a la página de admin, puedes cambiar el URL a la página correcta
    this.router.navigate(['/admin'], {
      state: {
        userName: this.userName,
        userEmail: this.userEmail,
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento
      }
    });
  }

  logout() {
    // Implementa la lógica de logout según sea necesario
    this.router.navigate(['/login']);
  }
}