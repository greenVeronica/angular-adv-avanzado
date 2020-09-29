import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit  {

  ngOnInit(){

  this.btnClass = `btn ${this.btnClass}`;
  }

// esta propiedad se carga desde un componente de afuera o padre
// desde el padre la variable se llama valor que luego se asocia
// a progreso
 @Input('valor') progreso: number = 50; // si se desea renombrar
                                       // si no se puede
  @Input() btnClass : string ="btn-info"// valor por default                                    

// esta variable va enviando los cambios que va sufriendo 
// mediante eventemmitter
// es como que este componente va disparando eventos
 @Output() cambioValor: EventEmitter<number> = new EventEmitter();
 // del lado del padre para escuchar el cambio se usa commo evento

  // luego se usara en el html
  // [style.width]="progreso"
 /*
  get getPorcentaje (){
    return `${this.progreso}%`; // para agregarle el %
    }
    */
 
 cambiarValor(valor:number){
 
   if (this.progreso >=100 && valor>=0){
     this.cambioValor.emit(100);
     return this.progreso = 100;
   }
   if (this.progreso <= 0  && valor <= 0){
    this.cambioValor.emit(0);
    return this.progreso = 0;
   }
 
   this.progreso = this.progreso + valor;
   this.cambioValor.emit(this.progreso);
 }
 onChange(evento:number){ // llegan los cambios en el imput 
  //console.log(evento);
 // this.cambioValor.emit(evento);
 if (evento >= 100){
  this.progreso = 100;
 }else if(evento<=0){
  this.progreso = 0;
 }else{
  this.progreso = evento;
 }
 this.cambioValor.emit(this.progreso);
 }

}
