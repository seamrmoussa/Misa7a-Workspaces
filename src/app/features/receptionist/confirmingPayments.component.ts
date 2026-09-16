import { Component, computed, inject, OnInit, Pipe, PLATFORM_ID, signal } from '@angular/core';
import { BookRoomService } from '../../core/service/book-room.service';
import { ConfirmPayment } from '../../confirm-payment.interface';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

interface Asset {
  id: number;
  type: 'desk' | 'suite';
  name: string;
  capacity: number;
  status: 'free' | 'busy';
  usagePercentage: number;
}

@Component({
  selector: 'app-confirmingPayments',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './confirmingPayments.component.html',
  styleUrl: './confirmingPayments.component.css',
})
export class confirmingPayments implements OnInit {
  private readonly bookRoomService = inject(BookRoomService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly fb = inject(FormBuilder);

  private readonly userId = signal<number>(0);

  totalPage = signal<number>(0);
  currentPage = signal<number>(0);
  nowSelectedStatus = signal<string>('');
  allDataToConfirm = signal<ConfirmPayment[]>([]);
  showReceiptImgModal = signal<boolean>(false);
  ReceiptImgSelected = signal<string | null>(null);
  showPaymentModal = signal<boolean>(false);
  reqIdForPayment = signal<number>(0);

  formPayment: FormGroup = this.fb.group({
    status: ['', [Validators.required]],
    adminId: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    reasonOfReject: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.checkConfirmPaymentStatus('ALL');
      const getUserId = localStorage.getItem('misa7aUserId');
      if (getUserId) {
        this.userId.set(Number(getUserId));
      }
    }
  }

  pagesArray = computed(() => {
    const total = this.totalPage();
    const current = this.currentPage();
    const delta = 3;

    if (total <= 11) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const pages: (number | string)[] = [];

    pages.push(0);

    let start = Math.max(1, current - delta);
    let end = Math.min(total - 2, current + delta);

    if (current <= 4) {
      end = 7;
    }
    if (current >= total - 5) {
      start = total - 8;
    }

    if (start > 1) {
      pages.push('...');
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < total - 2) {
      pages.push('...');
    }

    pages.push(total - 1);

    return pages;
  });

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((p) => p - 1);
      this.goToReqAsPerStatus();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPage() - 1) {
      this.currentPage.update((p) => p + 1);
      this.goToReqAsPerStatus();
    }
  }

  goToPage(pageNumber: number) {
    if (this.currentPage() !== pageNumber) {
      this.currentPage.set(pageNumber);
      this.goToReqAsPerStatus();
    }
  }

  goToReqAsPerStatus(): void {
    if (
      this.nowSelectedStatus() == 'PENDING' ||
      this.nowSelectedStatus() == 'CONFIRMED' ||
      this.nowSelectedStatus() == 'REJECTED'
    ) {
      this.getAllConfirmPaymentsByStatus(this.nowSelectedStatus());
    } else if (this.nowSelectedStatus() == 'PAYMENT' || this.nowSelectedStatus() == 'REFUND') {
      this.getAllConfirmPaymentsByTransactionType(this.nowSelectedStatus());
    } else {
      this.getAllConfirmPayment();
    }
  }

  checkConfirmPaymentStatus(status: string): void {
    this.nowSelectedStatus.set(status);
    if (status == 'PENDING' || status == 'CONFIRMED' || status == 'REJECTED') {
      this.getAllConfirmPaymentsByStatus(status);
    } else if (status == 'PAYMENT' || status == 'REFUND') {
      this.getAllConfirmPaymentsByTransactionType(status);
    } else {
      this.getAllConfirmPayment();
    }
  }

  getAllConfirmPayment(): void {
    this.bookRoomService.getPaymentConfirmationRequest(this.currentPage()).subscribe({
      next: (res) => {
        this.totalPage.set(res.data.totalPages);
        this.currentPage.set(res.data.number);
        this.allDataToConfirm.set(res.data.content);
      },
    });
  }

  getAllConfirmPaymentsByStatus(status: string): void {
    this.bookRoomService
      .getPaymentConfirmationRequestByStatus(status, this.currentPage())
      .subscribe({
        next: (res) => {
          this.totalPage.set(res.data.totalPages);
          this.currentPage.set(res.data.number);
          this.allDataToConfirm.set(res.data.content);
        },
      });
  }

  getAllConfirmPaymentsByTransactionType(status: string): void {
    this.bookRoomService
      .getPaymentConfirmationRequestByTransactionType(status, this.currentPage())
      .subscribe({
        next: (res) => {
          this.totalPage.set(res.data.totalPages);
          this.currentPage.set(res.data.number);
          this.allDataToConfirm.set(res.data.content);
        },
      });
  }

  approvalOfPaymenT(): void {
    if (this.formPayment.invalid) {
      this.formPayment.markAllAsTouched();
      return;
    }
    this.bookRoomService
      .DoApprovalOfPaymenT(this.formPayment.value, this.reqIdForPayment())
      .subscribe({
        next: (res) => {
          this.closeConfirmPaymentModal();
          this.getAllConfirmPayment();
          console.log(res);
        },
      });
  }

  isReceiptImgModalOpen(img: string): void {
    this.ReceiptImgSelected.set(img);
    this.showReceiptImgModal.set(true);
  }

  isReceiptImgModalClose(): void {
    this.ReceiptImgSelected.set(null);
    this.showReceiptImgModal.set(false);
  }

  openConfirmPaymentModal(reqID: number): void {
    this.reqIdForPayment.set(reqID);
    if (this.userId()) {
      this.formPayment.patchValue({ adminId: this.userId() });
    }
    this.showPaymentModal.set(true);
  }

  closeConfirmPaymentModal(): void {
    this.reqIdForPayment.set(0);
    this.formPayment.reset();
    this.showPaymentModal.set(false);
  }
}
