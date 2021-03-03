import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

import Swal from 'sweetalert2';
declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2:any;
 
  public loginForm = this.fb.group({ 
    // si le dio remember y esta en el localStorage lo muestro
    // si no existe va vacio para que no le ponga null
    email:[ localStorage.getItem('email') || '',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(3)]],
    remember:[false]
    });


  constructor(private fb: FormBuilder,
              private router: Router
            , private usuarioService: UsuarioService,
            private ngZone:NgZone ) { }

  ngOnInit(): void {
    // luego de que se cargue la pagina se ejecuta el onInit
    this.renderButton(); // cargo el boton
    console.log('hizo el render button');
    
  }
  login(){

    this.formSubmitted=true;

    console.log(this.loginForm);

    if(this.loginForm.invalid){
      console.log('form invalido');
      
     return;
     }
    
     this.usuarioService.loginUsuario( this.loginForm.value)
     // el crear usuario del servicio retorna un subscribe
                        .subscribe(respuesta =>{
                        // si seteo remember
                        if (this.loginForm.get('remember').value)   {
                          localStorage.setItem('email',this.loginForm.get('email').value);
                        }
                        else{
                          localStorage.removeItem('email');
                        }
                        this.router.navigateByUrl('/');// que seria el dashboard
                        },(err)=>{
             console.warn(err.error.msg);
     // usaremos el sweetalert para mostrar el error
             Swal.fire('Error', err.error.msg,'error');
 
   });//err.error.msg aca devolvi el error
   // desde el backend
   

    // navegaremos a la ruta de dasboard
    // usando el router
  //this.router.navigateByUrl('/');// que seria el dashboard
    
  }
  // onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //          // traemos  el token
  //          var id_token = googleUser.getAuthResponse().id_token;
  //          console.log(id_token);
  // }
  // onFailure(error) {
  //   console.log(error);
  // }
   renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      // 'onsuccess': this.onSuccess, SON A FINES EDUCATIVOS  se usa mas el startApp
      // 'onfailure': this.onFailure
    });
    this.startApp();
  }

   async startApp () {
    // llamo al gapi.load del usuario sevices
      await this.usuarioService.googleInit();
      // llamo la instancia de google que esta en auth2
      this.auth2=this.usuarioService.auth2;      
      this.attachSignin(document.getElementById('my-signin2'));
    
  }
   attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
        (googleUser)=>{
          // document.getElementById('name').innerText = "Signed in: " +
          //     googleUser.getBasicProfile().getName();
          const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token)
        .subscribe(
          // si anduvo ok navego al dashboard
          //  debo usar el ngZone, porque estoy en una 
          // libreria externa
          resp=>
          this.ngZone.run(()=>{
            this.router.navigateByUrl('/');
          })
          
        
        )}, (error)=> {
          alert(JSON.stringify(error, undefined, 2));
        });
  }

}
