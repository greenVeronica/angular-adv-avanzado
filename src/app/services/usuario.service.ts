import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form-interface';
import {  LoginForm} from '../interfaces/login-form-interface';

import { environment } from '../../environments/environment';
// creo afuera para no tener que usar this.base....
import { tap , map, catchError} from 'rxjs/operators'; // ejecuta un evento secundario
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url= environment.base_url;
declare const gapi:any;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public auth2:any;

  constructor(private http: HttpClient,
    private router:Router,
    private ngzone:NgZone // para evitar el warning de logout
    // ejecutar cosas desde una libreria externa que llame a procesos de
    // angular ver logout
    ) {
      this.googleInit(); // para hacer un logout necesito una instancia
      // de google 
   }
 googleInit()
 {// las promesas siempre se ejecutan
  // a diferencia de los observables 
  // necesitan que lo escuchen
   return new Promise(resolve=>{
     console.log('google init');
     
     
     gapi.load('auth2', ()=>{
       // Retrieve the singleton for the GoogleAuth library and set up the client.
       this.auth2 = gapi.auth2.init({
         client_id: '509788531987-b7mog59k51al9bfuicrluv7iopflddi8.apps.googleusercontent.com',
         cookiepolicy: 'single_host_origin',
         // Request scopes in addition to 'profile' and 'email'
         // scope: 'additional_scope'
       });
       // retorna la ejecucion del resolve
       resolve();
       });
   })
  }
  logout(){
    localStorage.removeItem("token");
 
    this.auth2.signOut().then(() => {
      // esto es una libreria externa ,
      // al navegar sale un warning en la consola
      // "Navigation triggered outside Angular zone,
      // did you forget to call 'ngZone.run()'"
      // this.router.navigateByUrl('/login');SE SOLUCIONA:
      this.ngzone.run(()=>{
        this.router.navigateByUrl('/login');
      });

    });
  }

  // revalidamos el token para validar 
  // la navegacion por el sitio 
  validarToken(): Observable<boolean>{ // devuelve un observable que emite un boolean
  const token = localStorage.getItem('token') || '';
  return this.http.get(`${base_url}/login/renew`,
                {headers:{
                  'x-token': token
                }}).pipe(
                  tap(resp=>{
                    // renovamos el token
                    localStorage.setItem('token',resp.token);
                  })
                  ,map(// transformar la respuesta en boolean
                    // para que el canActivate reciba un true o false
                    resp=>true)//si hay respuesta retorna true
                  ,catchError( error=> of (false) )// crea y devuelve un observable con false
                    
                  );



  }
    
  // recibimos los datos del formulario 
    // para crear el usuario  y luego llamamos al backserver
    // para crearlo efectivamente en la base
  crearUsuario(formData: RegisterForm){
    console.log('creando usuario');
    // hacemos la peticion localhost:3000/api/usuarios
    return this.http.post(`${base_url}/usuarios`,formData)
                .pipe(tap((data)=>{
                  localStorage.setItem("token",data.token)
            }));
      
      }
  loginUsuario(formData: LoginForm){
    return this.http.post(`${base_url}/login`,formData)
                    .pipe(tap((data)=>{
                          localStorage.setItem("token",data.token)
                    }));
    }

    loginGoogle(token){
      return this.http.post(`${base_url}/login/google`,{token})
                      .pipe(tap((data)=>{
                            localStorage.setItem("token",data.token)
                      }));
      }
      

}
