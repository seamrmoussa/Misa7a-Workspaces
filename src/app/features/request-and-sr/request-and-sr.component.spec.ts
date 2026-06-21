import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAndSrComponent } from './request-and-sr.component';

describe('RequestAndSrComponent', () => {
  let component: RequestAndSrComponent;
  let fixture: ComponentFixture<RequestAndSrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestAndSrComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestAndSrComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
