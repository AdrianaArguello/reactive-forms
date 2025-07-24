import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicPageComponent } from './dinamic-page.component';

describe('DinamicPageComponent', () => {
  let component: DinamicPageComponent;
  let fixture: ComponentFixture<DinamicPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamicPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
