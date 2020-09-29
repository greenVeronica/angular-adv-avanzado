import { Component ,Input} from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-donna',
  templateUrl: './donna.component.html',
  styles: [
  ]
})
export class DonnaComponent  {
@Input('titulo') titulo:string="Sin Titulo";
  // Doughnut
  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100]//fila de datos
  ];
  public colors : Color[]=[
    // defino los colores de la unica fila 
    // si hubiera mas fila debo definir mas colores
    {backgroundColor:['#6857E6','#009FEE','#F02059']}
  ];





}
