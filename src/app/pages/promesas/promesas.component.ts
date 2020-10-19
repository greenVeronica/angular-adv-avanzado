import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promesa = new Promise(// se define el resolve que es el callback obligatrio
      (resolve) => {
        // definimos el resolve seria una variable callback
        resolve('hola soy una promesa');
      });
      // llamamos a la promesa y ejecutamos el then cuando se resuelva
      promesa.then((data)=>{
        console.log(data);
        
      }).then(()=>{
        console.log('fin del init');
      });
      this.getUsuario().then(usuarios=>console.log(usuarios));
  }
  // ejercicio de prueba de una promesa con fetch
  getUsuario(){
    return  new Promise(resolve => {
  /*UNA FORMA DE HACERLO
    fetch('https://reqres.in/api/users').then(
      (data)=>{
        console.log (data.json().then(data=>console.log(data)));
    });
    OTRA FORMA MAS SIMPLE con dos then en lugar de uno dentro de otro*/
    fetch('https://reqres.in/api/users')
    .then(resp => resp.json()) // como el json()devuelve una promesa
    .then(data => resolve(data.data));
    });
  // de esta manera lo consumo arriba o cuando quiero ejecuto la promesa

  
}
}
