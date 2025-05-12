import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {ClientePost, ClienteService} from '../service/cliente.service';
import {Subject} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-cliente-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.css'
})
export class ClienteFormComponent implements OnInit {
  // @ts-ignore
  miFormulario: FormGroup;
  maxDate = new Date();

  private clienteService = inject(ClienteService);
  private readonly destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombre: ['', Validators.required], // Campo 'nombre' con validación de requerido
      apellido: ['', Validators.required], // Campo 'apellido' con validación de requerido
      edad: [null, [Validators.required, Validators.min(0)]], // Campo 'edad' requerido y con valor mínimo 0
      fechaDeNacimiento: [''] // Campo 'fechaDeNacimiento' sin validaciones específicas por ahora
    });
  }

  openSnackBar(message: string, obj?: any) {
    console.log(obj.panelClass);
    this._snackBar.open(message, 'X', obj);
  }

  onSubmit() {
    if (this.miFormulario.valid) {
      let post: ClientePost = {
        nombre: this.miFormulario.value.nombre,
        apellido: this.miFormulario.value.apellido,
        edad: this.miFormulario.value.edad,
        fechaDeNacimiento: this.miFormulario.value.fechaDeNacimiento
      };
      this.clienteService.postData(post).subscribe({
        next: () => {
          this.openSnackBar('Cliente creado correctamente');
        },
        error: (error) => {
          this.openSnackBar(error.error.readableMsg, { duration: 2000, panelClass: ['mat-warn'] });
        }
      })

      this.miFormulario.reset();
    } else {
      console.log('El formulario no es válido');
    }
  }
}
