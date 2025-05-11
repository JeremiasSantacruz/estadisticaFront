import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaCardComponent } from './estadistica-card.component';

describe('EstadisticaCardComponent', () => {
  let component: EstadisticaCardComponent;
  let fixture: ComponentFixture<EstadisticaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
