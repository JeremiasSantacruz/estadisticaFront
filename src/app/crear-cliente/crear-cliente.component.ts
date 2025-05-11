import {AfterViewInit, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {ClienteElement, ClienteService, PaginationResponse} from '../service/cliente.service';
import {Observable, Subject, takeUntil} from 'rxjs';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css',
  imports: [MatTableModule, MatPaginatorModule],
})
export class CrearClienteComponent implements AfterViewInit, OnInit{
  clienteList$!: Observable<PaginationResponse>;
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'fechaDeNacimiento', 'fechaEstimadaDeMuerte'];
  dataSource = new MatTableDataSource<ClienteElement>([]); // Initialize with an empty array
  totalItems = 0;
  pageSize = 10; // Initial page size
  pageIndex = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator;

  private clienteService = inject(ClienteService);
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.clienteService.clienteEnviado.subscribe(index => {
      this.loadData(this.pageIndex, this.pageSize);
    });
    this.loadData(this.pageIndex, this.pageSize);
  }

  loadData(pageIndex: number, pageSize: number ): void {
    this.clienteService.getData(pageIndex, pageSize)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: PaginationResponse) => {
      this.dataSource.data = response.content;
      this.totalItems = response.totalElements;
      this.pageSize = response.pageable.pageSize; // Update in case the server provides a different size
      this.pageIndex = response.pageable.pageNumber;
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

