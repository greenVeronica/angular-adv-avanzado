import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-acount-settings',
  templateUrl: './acount-settings.component.html',
  styles: [
  ]
})
export class AcountSettingsComponent implements OnInit {
public   tema = document.querySelector("#theme");// tema principal lo toma de index

    
  constructor(private serviceSettings:SettingsService) { }

  ngOnInit(): void {
     this.serviceSettings.checkCurrentTheme();


  }
  changeTheme(theme:string){
   this.serviceSettings.changeTheme(theme);
   this.serviceSettings.checkCurrentTheme();
   }
  
 
}
