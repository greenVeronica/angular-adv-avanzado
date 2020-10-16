import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
    
  constructor(private settingsService: SettingsService ) { }

  ngOnInit(): void {
      /*
   const url = localStorage.getItem('theme');
   if (!url){// si no esta definido
    url= './assets/css/colors/green.css'// color por default
   }
   */// otra opcion de escribir lo mismo
      customInitFunction(); // como es global funciona
   // para que typescript no se queje se crea como variable al 
   // principio

  }

}
