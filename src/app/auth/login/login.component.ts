import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  login(){
    // navegaremos a la ruta de dasboard
    // usando el router
    this.router.navigateByUrl('/');// que seria el dashboard
    
  }

}
