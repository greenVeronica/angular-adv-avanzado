import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // creando la estructura del  menu lateral 
  menu: any[]=[ // array de obj
    {
      titulo:'Dashboard!!!',
      icono:'mdi mdi-gauge',
      submenu:[
        {titulo: 'Main', url: '/'},
        {titulo: 'ProgressBar', url: 'progress'},
        {titulo: 'Graficas', url: 'grafica1'},
        {titulo: 'Promesas', url: 'promesas'},
        {titulo: 'RxjsComponent', url: 'RxjsComponent'}

      ]
    }
  ];

  constructor() { }
}
