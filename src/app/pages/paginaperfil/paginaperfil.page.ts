import { Component, OnInit } from '@angular/core';
import { userName } from '../../tab1/tab1.page';

@Component({
  selector: 'app-paginaperfil',
  templateUrl: './paginaperfil.page.html',
  styleUrls: ['./paginaperfil.page.scss'],
})
export class PaginaperfilPage implements OnInit {

  userName: string = userName;
  userEmail: string = "juanito@duocuc.cl"
  edad: number = 20;
  nombre: string = "Juan";
  apellido: string = "Vergara";
  constructor() { }

  ngOnInit() {
  }

}
