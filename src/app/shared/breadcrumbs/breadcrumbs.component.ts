import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter,map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {
public titulo: string;
public tituloSubs$ : Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRutas()
                            .subscribe(({titulo}) => {
                              this.titulo = titulo // otra opcion con la desestructuracion
                              // el nombre del sitio se lo cambiamos
                              document.title=`AdminPro - ${titulo}`;
                              }); 
   }
   getArgumentosRutas(){
    return this.router.events
    .pipe(
      filter  (
        // lo que devuelve debe ser verdadero
        event => event instanceof ActivationEnd ),
      // aplico otro fitro al resultado del primer filter
      // el que quiero es el que cumple la siguiente condicion
      filter((event: ActivationEnd ) => event.snapshot.firstChild === null),
      map  ((event: ActivationEnd ) => event.snapshot.data) // traigo lo que necesito  
    )
   // .subscribe(data => this.titulo = data.titulo); // aca esta lo del la ruta definida en el data

   }
   ngOnDestroy(): void{
      console.log('hace la subs');
      this.tituloSubs$.unsubscribe(); // al hacer logout es importante
      // que se borre la subscripcion
   }
}
