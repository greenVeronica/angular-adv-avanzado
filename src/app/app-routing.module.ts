import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';

import { Routes, RouterModule } from '@angular/router';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  // se recomienda una pequeña doc de donde estan las rutas
  // path: '/dashboard' pagerouting
  // path: '/auth' Authrouting
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent}// cualquier otra direccion va al componente

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  PagesRoutingModule,
  AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
