import { Component } from '@angular/core';
export const userName = 'Juanito';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userName: string = userName;

  constructor() {}

}
