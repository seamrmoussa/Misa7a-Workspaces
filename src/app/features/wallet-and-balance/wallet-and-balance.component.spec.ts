import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletAndBalanceComponent } from './wallet-and-balance.component';

describe('WalletAndBalanceComponent', () => {
  let component: WalletAndBalanceComponent;
  let fixture: ComponentFixture<WalletAndBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletAndBalanceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletAndBalanceComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
