import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmDashboardComponent } from './gm-dashboard.component';

describe('GmDashboardComponent', () => {
  let component: GmDashboardComponent;
  let fixture: ComponentFixture<GmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GmDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
