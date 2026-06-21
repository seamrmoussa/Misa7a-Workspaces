import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWorkspaceComponent } from './all-workspace.component';

describe('AllWorkspaceComponent', () => {
  let component: AllWorkspaceComponent;
  let fixture: ComponentFixture<AllWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllWorkspaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AllWorkspaceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
