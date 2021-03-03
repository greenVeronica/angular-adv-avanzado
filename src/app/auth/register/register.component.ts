import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ]
})
// manejaremos los formularios en forma reactive
// todo desde el componente
export class RegisterComponent  {

  public formSubmitted=false;

  // aunque fb lo defino en el constructor
  //  lo puedo usar aca, 
  public registerForm=this.fb.group({ // campos del formulario
   // nombre:['Veronica',// valor por defecto
    nombre:['eeee', [Validators.required, Validators.minLength(3) ]  ], // validaciones
    email:['ddd@gmail.com',[Validators.required,Validators.email]],
    password:['123456',[Validators.minLength(3)]],
    password2:['1234567',[Validators.minLength(3)]], // para que la repita
    terminos:[false,[Validators.required]], // para que la repita
    
  }, // fin del group luego pueden venir las validaciones personalizadas
  {
    // creamos un validador sincrono , la referencia debe regresar una funcion
    validators: this.passwordsIguales('password', 'password2') // es la referencia a la funcion
  });

  constructor(private fb: FormBuilder
          , private usuarioService: UsuarioService,
          private router : Router  ) {

   }

 crearUsuario(){
   this.formSubmitted=true;

   console.log(this.registerForm.value);
   if(this.registerForm.invalid){
    return;
    }
    // si ses valido realizar el posteo
    // mando toda la data del form
    this.usuarioService.crearUsuario( this.registerForm.value)
    // el crear usuario del servicio retorna un subscribe
                                    .subscribe(respuesta =>{
                                      this.router.navigateByUrl('/');// que seria el dashboard
  },(err)=>{
            console.warn(err.error.msg);
    // usaremos el sweetalert para mostrar el error
            Swal.fire('Error', err.error.msg,'error');

  });//err.error.msg aca devolvi el error
  // desde el backend

 }


 campoNoValido(campo: string): boolean{
  if(this.registerForm.get(campo).invalid && this.formSubmitted){
    return true;
  }else{  return false;}
 }
 aceptaTerminos(): boolean{
   return !this.registerForm.get('terminos').value && this.formSubmitted;
 }
 clavesNoValidas(): boolean{
   const pass1=this.registerForm.get('password').value;
   const pass2=this.registerForm.get('password2').value;
   if ((pass1 !== pass2) && this.formSubmitted){
     return true;
   }
   else{
     return false;
   }

  }
  passwordsIguales(pass1Name: string, pass2Name: string){
    // debe regresar un obj si da error y si anda bien devuelve un null

    return (formgroup: FormGroup) => {// regresa una funcion se debe declarar asi para 
      // que lo tome el formulario reactivo
      const pass1Control = formgroup.controls[pass1Name];
      const pass2Control = formgroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value){
        // si son iguales hay que dejarlos pasar y setear alguno de los dos controles en null
          pass2Control.setErrors(null); // es lo que chequa el valid del formuario
      }else
      {
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

}
