import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,  Router } from '@angular/router';

import { UsuarioService } from '../services/usuario.service';
import { Observable } from 'rxjs';
import { tap ,map} from 'rxjs/operators'; // ejecuta un evento secundario
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private usuarioService: UsuarioService,
      private router: Router  ){

    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      // directamente retorna el boolean que recibe de validarToken
     return   this.usuarioService.validarToken()//;// para no tocar esta instruccion paso la resp por el pipe
               .pipe(tap(// transformo la resp
                // si es false no redirecciona a ningun lado
                estaAutenticado=>{
                  if(!estaAutenticado){// si es false 
                    this.router.navigateByUrl('/login');

                  }
                }
                ));

  }
  
}
