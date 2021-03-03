import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guard/auth.guard';


const routes: Routes = [
    // quiero que las rutas comiencen con dashboard
    // para que quede todo dentro del menu dashboard
    // una vez autentificado
    {path: 'dashboard' , 
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [ // rutas hijas
     {path: '', component: DashboardComponent, data:{titulo:'Dashboard'}},
     {path: 'grafica1', component: Grafica1Component, data:{titulo:'Grafica'}},
     {path: 'promesas', component: PromesasComponent, data:{titulo:'Promesas'}},
     {path: 'progress', component: ProgressComponent, data:{titulo:'Progress'}},
     {path: 'acount-settings', component: AcountSettingsComponent, data:{titulo:'Acount-Settings'}},
     {path: 'RxjsComponent', component: RxjsComponent, data:{titulo:'Operadores Rxjs'}},
    //   {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
   ]
    }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
