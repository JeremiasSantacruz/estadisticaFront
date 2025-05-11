import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CrearClienteComponent} from './crear-cliente/crear-cliente.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {ClienteFormComponent} from './cliente-form/cliente-form.component';
import {EstadisticaCardComponent} from './estadistica-card/estadistica-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CrearClienteComponent, MatTabGroup, MatTab, ClienteFormComponent, EstadisticaCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estadisticaFront';
}
