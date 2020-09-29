import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonnaComponent } from './donna/donna.component';



@NgModule({
  declarations: [IncrementadorComponent, DonnaComponent],
  exports:[
    IncrementadorComponent,
    DonnaComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
