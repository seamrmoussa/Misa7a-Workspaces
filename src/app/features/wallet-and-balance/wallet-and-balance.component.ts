import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-wallet-and-balance',
  imports: [],
  templateUrl: './wallet-and-balance.component.html',
  styleUrl: './wallet-and-balance.component.css',
})
export class WalletAndBalanceComponent {
  walletInfo = signal({
    balance: '12,450.00',
    currency: 'USD',
    availableCredits: 450,
    pendingAmount: '120.00',
    nextBillingDate: 'Oct 12, 2024',
  });

  // طرق الدفع
  paymentMethods = signal([{ id: 1, type: 'VISA', last4: '4242', isPrimary: true }]);

  // سجل المعاملات
  transactions = signal([
    {
      id: 1,
      status: 'Completed',
      title: 'Top-up via Credit Card',
      ref: 'Ref: #TXN-90210-AS',
      date: 'Sept 28, 2024',
      amount: '+$1,500.00',
    },
    {
      id: 2,
      status: 'Completed',
      title: 'Booking: Penthouse Studio B',
      ref: 'Ref: #BK-8821- sanctuary',
      date: 'Sept 25, 2024',
      amount: '-$420.00',
    },
    {
      id: 3,
      status: 'Completed',
      title: 'Monthly Concierge Fee',
      ref: 'Service Subscription',
      date: 'Sept 12, 2024',
      amount: '-$150.00',
    },
    {
      id: 4,
      status: 'Processing',
      title: 'Withdrawal to Bank Account',
      ref: 'Standard Transfer (3-5 days)',
      date: 'Sept 10, 2024',
      amount: '-$2,000.00',
    },
    {
      id: 5,
      status: 'Completed',
      title: 'Referral Bonus: John Smith',
      ref: 'Promotion Reward',
      date: 'Sept 05, 2024',
      amount: '+$50.00',
    },
  ]);
}
