import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLayoutComponent } from './general-layout.component';

describe('GeneralLayoutComponent', () => {
  let component: GeneralLayoutComponent;
  let fixture: ComponentFixture<GeneralLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
