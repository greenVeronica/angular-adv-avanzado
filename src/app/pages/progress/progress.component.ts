import { Component } from '@angular/core';


@Component({
      selector: 'app-progress',
      templateUrl: './progress.component.html',
      styleUrls: ['./progress.component.css' ]
    })

export class ProgressComponent   {
  progreso1 :number=15;
  progreso2 :number=50;

  get getProgreso1(){
    return `${this.progreso1}%`;
  }
  get getProgreso2(){
    return `${this.progreso2}%`;
  }

  // no es necesario se setea directo en el html
  cambioValorHijo(valor: number){// lo que dispara el emit $event
    console.log("se disparo el evento cambioValor que es un output del incrementador");
    
  }

}
