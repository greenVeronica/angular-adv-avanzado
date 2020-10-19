import { Component, OnDestroy } from '@angular/core';
import { Observable ,  interval, Subscription} from 'rxjs'; // interval hace lo mismo que setInterval pero mas facil
import { retry, take , map , filter} from 'rxjs/operators'; // retry cuantas veces reintenta
                                                  // take cuantas veces tomo del observable
                                                  // map es para transformar los datos que vienen del observable
                                                  // lo agrego dentro del pipe al map
                                                  // filter de los valores que retorna filtro algunos


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription; // para manejar el subscribe asi se puede limpiar

  constructor() {
      // una vez creado el observable en la funcion retornaObservable , la llamo para 
      // usarla, y  hay que subscribirse , sino no hace nada
      this.retornaObservable().pipe(// pipe sirve para transformar los datos
                  retry(1)// vuelve a intentar una vez si da error
                ).subscribe(valornext => console.log("Subs:",valornext),
                   valorerror => console.warn("error:",valorerror),
                   () => console.log('obs complete'));



    // usaremos el observable intervalo$
    this.intervalSubs = this.retornaIntervalo()
     //   .subscribe(valor =>console.log(valor)); // otra manera de escribir
        .subscribe(console.log); // otra manera de escribir todo los parametros que vengan 
                                 // a la izq, van a la derecha de la funcion definida 
                                 // en este caso el console.log

   }
   ngOnDestroy(){
    this.intervalSubs.unsubscribe();
  }


  retornaObservable(): Observable<number>{ 
      // crear mi propio observable
    // la notacion es agregarle $ al final solo standard
    // el obsesrvable dentro tiene un callback igual que la promesa
    // indicando el codigo que quiero que haga
    // como el resolve y reject es recomendado en una promesa
    // en los observables se usan observer, este es de tipo subscriber
    // el observer es quien dice como esta el obsevable y que informacion 
    // esta fluyendo a traves de el.

    // es muy importante finalizar el observable en algun momento
    // sino puede llegar a usar mucha memoria
    let i=-1;
    const obs$ = new Observable<number>(observer => {
      
      const intervalo = setInterval(() => {
       // console.log('se repite cada seg');
       i++;
       // para que lo obtenga desde la subscripcion lo debo emitir
       observer.next(i);
       if (i===4){
      // indicar que ya termino, no voy a seguir emitiendo mas numeros
        clearInterval(intervalo); // termino el invalo
        observer.complete(); // trmino el observable
       }
       if (i===2){ // solo para prueba 
        observer.error('se produjo un error ne el 2');
       }

      }, 1000); // se repite cada segundo

    });
    return obs$; // retorna observable
  
  }

    // creamos un internal que retorna un observable
    retornaIntervalo():Observable<number>{
       const intervalo$ =  interval(1000)
                           .pipe(
                              //    map(valor=>{return valor +1 }));  // retorna el valor que devuelve el observable mas 1
                            // otra opcion de mapeo , conviene el map antes del take , es importante el orden
                              map(valor => valor + 1),
                              filter(valor =>( valor%2===0?true:false)), //si es par lo devuelve 
                             take(10),// retorna un observable toma dos repeticiones segun el take
                        
                        );  
       return intervalo$;

    }


}
