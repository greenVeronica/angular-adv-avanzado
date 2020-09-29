import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

 public labelsGrafica: string[] = ['pan', 'Refrescos', 'tacos'];
public data1=[ [10, 15, 40]
];
}
