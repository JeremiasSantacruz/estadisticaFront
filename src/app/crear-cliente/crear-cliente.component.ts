import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ClienteElement, ClienteService, PaginationResponse} from '../service/cliente.service';
import {Observable, Subject, Subscription, takeUntil} from 'rxjs';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css',
  imports: [MatTableModule, MatPaginatorModule],
})
export class CrearClienteComponent implements AfterViewInit, OnInit {
  clienteList$!: Observable<PaginationResponse>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'fechaDeNacimiento', 'fechaEstimadaDeMuerte'];
  dataSource = new MatTableDataSource<ClienteElement>([]); // Initialize with an empty array
  totalItems = 0;
  pageSize = 10; // Initial page size
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private clienteService = inject(ClienteService);
  private clienteEnviado: Subscription | undefined;
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.clienteEnviado = this.clienteService.clienteEnviado.subscribe(index => {
      this.loadData();
    });
  }

  loadData(): void {
    const page = this.paginator.pageIndex ?? 0;
    const size = this.paginator.pageSize ?? this.pageSize;
    this.clienteService.getData(page, size)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: PaginationResponse) => {
        this.dataSource.data = response.content;
        this.totalItems = response.totalElements;
        this.pageSize = response.pageable.pageSize; // Update in case the server provides a different size
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadData()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

