import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutMessageComponent } from './logout-message.component';

describe('LogoutMessageComponent', () => {
  let component: LogoutMessageComponent;
  let fixture: ComponentFixture<LogoutMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutMessageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutMessageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
