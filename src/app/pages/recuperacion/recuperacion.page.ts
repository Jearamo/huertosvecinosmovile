import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperacion',
  templateUrl: './recuperacion.page.html',
  styleUrls: ['./recuperacion.page.scss'],
})
export class RecuperacionPage implements OnInit {
  
  userEmail: string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  enviarCodigo() {
    this.router.navigate(['/cambiopassword'], { queryParams: { email: this.userEmail } });
  }
}
