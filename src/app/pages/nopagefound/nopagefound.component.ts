import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styleUrls: ['./nopagefound.component.css' ]
})
export class NopagefoundComponent  {
  // generaremos como parametro el año
  year = new Date().getFullYear();


}
