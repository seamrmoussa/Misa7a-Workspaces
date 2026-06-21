import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceTypeComponent } from './space-type.component';

describe('SpaceTypeComponent', () => {
  let component: SpaceTypeComponent;
  let fixture: ComponentFixture<SpaceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceTypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceTypeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
