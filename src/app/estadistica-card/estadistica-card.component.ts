import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {ClienteService, Estadiistica} from '../service/cliente.service';

@Component({
  selector: 'app-estadistica-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatDivider,
    MatCardContent,
  ],
  templateUrl: './estadistica-card.component.html',
  styleUrl: './estadistica-card.component.css'
})
export class EstadisticaCardComponent implements OnInit {
  promedio: number = 0;
  desviacionEstandar: number = 0;
  private clienteService = inject(ClienteService);

  constructor() { }

  ngOnInit(): void {
    this.clienteService.getEstadistica()
      .pipe()
      .subscribe((estadistica: Estadiistica) => {
        this.promedio = estadistica.promedio;
        this.desviacionEstandar = estadistica.desviacionEstandar;
      });
  }

}
