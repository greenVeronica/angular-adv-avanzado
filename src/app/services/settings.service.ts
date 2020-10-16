import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private   tema = document.querySelector("#theme");

  constructor() { 
    console.log('settings Service init ');
    const url = localStorage.getItem('theme') || './assets/css/colors/green.css';
    this.tema.setAttribute('href', url);
   
  }
  
  changeTheme(color:string){
    const url=`./assets/css/colors/${color}.css`;
    
    this.tema.setAttribute('href',url);
    localStorage.setItem('theme',url);  
     this.checkCurrentTheme();
  }
  checkCurrentTheme(){
 
    //  console.log(selectores);
      // quito el working por si es la segunda vez
      const  selectores=document.querySelectorAll(".selector");

     selectores.forEach((elemento)=>{
          elemento.classList.remove("working");
          const btnThemeemento=elemento.getAttribute("data-theme");
          const btnThemeURL =`./assets/css/colors/${btnThemeemento}.css`;
          const currentTheme =this.tema.getAttribute("href");
  
    if(btnThemeURL ===currentTheme){
      elemento.classList.add("working");}
       
    });
    
    }
}
