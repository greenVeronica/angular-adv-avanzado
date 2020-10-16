import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { AcountSettingsComponent } from './acount-settings/acount-settings.component';


const routes: Routes = [
    // quiero que las rutas comiencen con dashboard
    // para que quede todo dentro del menu dashboard
    // una vez autentificado
    {path: 'dashboard' , component: PagesComponent,
     children: [ // rutas hijas
     {path: '', component: DashboardComponent},
     {path: 'grafica1', component: Grafica1Component},
     {path: 'progress', component: ProgressComponent},
     {path: 'acount-settings', component: AcountSettingsComponent},
    //   {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
   ]
    }
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
