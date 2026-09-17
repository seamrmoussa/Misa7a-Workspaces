import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { BookRoomService } from '../../core/service/book-room.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { ResBookData } from '../../res-book-data.interface';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-history',
  imports: [ReactiveFormsModule, DatePipe, CurrencyPipe],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css',
})
export class BookingHistoryComponent implements OnInit {
  // All inject service

  private readonly bookRoomService = inject(BookRoomService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  // All property

  private readonly userId = signal<string>('');
  currentDateTime: String = new Date().toISOString();
  intervalId: any;
  bookingHistory = signal<ResBookData[]>([]);
  totalPage = signal<number>(0);
  currentPage = signal<number>(0);
  showCancelModal = signal<boolean>(false);
  showConfirmPaymentModal = signal<boolean>(false);
  imgConfirmPayment!: File;
  selectedFileName = signal<string>('');
  confirmBookId = signal<number>(0);
  cancelBookingPartTime = signal<boolean>(false);
  cancelBookingId = signal<number>(0);
  bookFilterById = signal<boolean>(false);

  // All Form Controls

  bookById: FormControl = new FormControl('', Validators.required);

  formCancellation = this.fb.group({
    cancelledByUserId: [Number(this.userId())],
    reason: ['This timing is not needed at the moment.', Validators.required],
    cancelStartDatetime: ['', Validators.required],
    cancelEndDatetime: ['', Validators.required],
  });

  formConfirmPayment: FormGroup = this.fb.group({
    depositMethod: ['', [Validators.required]],
    paidToNumber: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    senderNumber: ['', [Validators.required, Validators.pattern(/^(010|011|012|015)[0-9]{8}$/)]],
    referenceCode: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userIdNumber = localStorage.getItem('misa7aUserId');
      if (userIdNumber) {
        this.userId.set(userIdNumber?.toString());
        this.getAllMyPrevReservations();
      }
    }

    this.intervalId = setInterval(() => {
      this.currentDateTime = new Date().toISOString();
    }, 1000);
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
      this.getAllMyPrevReservations();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPage() - 1) {
      this.currentPage.update((p) => p + 1);
      this.getAllMyPrevReservations();
    }
  }

  goToPage(pageNumber: number) {
    if (this.currentPage() !== pageNumber) {
      this.currentPage.set(pageNumber);
      this.getAllMyPrevReservations();
    }
  }

  getBookById() {
    if (this.bookById.valid) {
      this.bookRoomService.getBookingById(this.bookById.value).subscribe({
        next: (res) => {
          this.bookingHistory.set([res.data]);
          this.bookFilterById.set(true);
        },
      });
    }
  }

  getAllMyPrevReservations() {
    this.bookRoomService.getAllMyPrevBookings(this.userId(), this.currentPage()).subscribe({
      next: (res) => {
        this.totalPage.set(res.data.totalPages);
        this.currentPage.set(res.data.number);
        this.bookingHistory.set(res.data.content);
      },
    });
  }

  cancelBooking() {
    if (this.formCancellation.valid) {
      this.bookRoomService
        .cancelBooking(this.cancelBookingId(), {
          ...this.formCancellation.value,
          cancelStartDatetime: this.formCancellation.value.cancelStartDatetime + ':00.000Z',
          cancelEndDatetime: this.formCancellation.value.cancelEndDatetime + ':00.000Z',
        })
        .subscribe({
          next: (res) => {
            this.toastrService.success('Your booking has been successfully cancelled');
            this.formCancellation.reset();
            this.getAllMyPrevReservations();
          },
          complete: () => {
            this.closeCancelModal();
          },
        });
    } else {
      this.formCancellation.markAllAsTouched();
    }
  }

  isPastDate(bookingDate: string): boolean {
    const dateToCompare = new Date(bookingDate).getTime();
    const now = new Date().getTime();

    return dateToCompare > now;
  }

  isModalCancelVisible(bookingData: ResBookData) {
    this.formCancellation.patchValue({
      cancelledByUserId: Number(this.userId()),
      reason: 'This timing is not needed at the moment.',
      cancelStartDatetime: bookingData.startDatetime.slice(0, 16),
      cancelEndDatetime: bookingData.endDatetime.slice(0, 16),
    });
    this.showCancelModal.set(true);
    this.cancelBookingId.set(bookingData.id);
  }

  closeCancelModal() {
    this.showCancelModal.set(false);
    this.cancelBookingPartTime.set(false);
  }

  cancelPartTime() {
    this.cancelBookingPartTime.update((v) => !v);
  }

  ConfirmPayment(event: Event): void {
    const inputImg = event.target as HTMLInputElement;
    if (inputImg.files && inputImg.files.length > 0) {
      this.imgConfirmPayment = inputImg.files[0];
      this.selectedFileName.set(inputImg.files[0].name);
    }
  }

  onSubmitConfirmPayment(): void {
    if (this.formConfirmPayment.invalid) return;

    const formConfirm = new FormData();
    formConfirm.append('depositMethod', this.formConfirmPayment.get('depositMethod')?.value);
    formConfirm.append('paidToNumber', this.formConfirmPayment.get('paidToNumber')?.value);
    formConfirm.append('senderNumber', this.formConfirmPayment.get('senderNumber')?.value);
    formConfirm.append('referenceCode', this.formConfirmPayment.get('referenceCode')?.value);
    formConfirm.append('amount', this.formConfirmPayment.get('amount')?.value);

    if (!this.imgConfirmPayment) {
      this.toastrService.warning('Please attach a screenshot of the transfer.');
      return;
    }
    formConfirm.append('screenshot', this.imgConfirmPayment);
    this.bookRoomService
      .sendPaymentConfirmationRequest(formConfirm, this.confirmBookId())
      .subscribe({
        next: () => {
          this.toastrService.success(
            'Your request has been submitted and is currently under review.',
          );
          this.selectedFileName.set('');
          this.formConfirmPayment.reset();
          this.closeConfirmPaymentModal();
        },
      });
  }

  isModalConfirmPaymentVisible(bookingId: number) {
    this.confirmBookId.set(bookingId);
    this.showConfirmPaymentModal.set(true);
  }

  closeConfirmPaymentModal() {
    this.confirmBookId.set(0);
    this.showConfirmPaymentModal.set(false);
    this.formConfirmPayment.reset();
    this.selectedFileName.set('');
  }

  restFindBookById() {
    this.bookFilterById.set(false);
    this.bookById.reset();
    this.getAllMyPrevReservations();
  }
}
