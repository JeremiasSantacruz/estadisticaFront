import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080';

  private http = inject(HttpClient);

  private clienteEnviadoSubject = new Subject<number>();
  clienteEnviado = this.clienteEnviadoSubject.asObservable();

  getData(page: number, size: number): Observable<PaginationResponse> {
    return this.http.get<PaginationResponse>(`${this.apiUrl}/listclientes?page=${page}&size=${size}`);
  }

  postData(data: ClientePost): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/crearcliente`, data).pipe(tap(() => {
      this.clienteEnviadoSubject.next(1);
    }));
  }

  getEstadistica(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/kpideclientes`);
  }


}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface PaginationResponse {
  content: ClienteElement[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface ClienteElement {
  id: number;
  nombre: string;
  apellido: string;
  edad: number;
  fechaDeNacimiento: string;
  fechaEstimadaDeMuerte: string;
}

export interface ClientePost {
  nombre: string;
  apellido: string;
  edad: number;
  fechaDeNacimiento: string;
}

export interface Estadiistica {
  promedio: number;
  desviacionEstandar: number;
}
