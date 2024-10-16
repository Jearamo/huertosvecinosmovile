import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss']
})
export class TabsPage implements OnInit {
  userName: string = '';
  userEmail: string = '';
  nombre: string = '';
  apellido: string = '';
  fechaNacimiento: Date = new Date();
  password: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const state = navigation.extras.state as any;
      this.userName = state.userName || 'Usuario';
      this.userEmail = state.userEmail || '';
      this.nombre = state.nombre || '';
      this.apellido = state.apellido || '';
      this.fechaNacimiento = state.fechaNacimiento ? new Date(state.fechaNacimiento) : new Date();
      this.password = state.password || '';
    }
  }

  goToTab3() {
    const navigationExtras: NavigationExtras = {
      state: {
        userName: this.userName,
        userEmail: this.userEmail,
        nombre: this.nombre,
        apellido: this.apellido,
        fechaNacimiento: this.fechaNacimiento.toISOString(),
        password: this.password
      }
    };
    this.router.navigate(['/tabs/tab3'], navigationExtras);
  }
}
