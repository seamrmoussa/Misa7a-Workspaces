import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { BookRoomService } from '../../core/service/book-room.service';
import { CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { ResBookData } from '../../res-book-data.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RatedService } from '../../core/service/rated.service';

@Component({
  selector: 'app-booking-history',
  imports: [ReactiveFormsModule, DatePipe, CurrencyPipe],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css',
})
export class BookingHistoryComponent implements OnInit {
  private readonly bookRoomService = inject(BookRoomService);
  private readonly ratedService = inject(RatedService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  private readonly userId = signal<string>('');

  bookingHistory = signal<ResBookData[]>([]);
  totalPage = signal<number>(0);
  currentPage = signal<number>(0);
  showCancelModal = signal<boolean>(false);
  showRatedModal = signal<boolean>(false);
  cancelBookingPartTime = signal<boolean>(false);
  cancelBookingId = signal<number>(0);

  formCancellation = this.fb.group({
    cancelledByUserId: [Number(this.userId())],
    reason: ['This timing is not needed at the moment.', Validators.required],
    cancelStartDatetime: ['', Validators.required],
    cancelEndDatetime: ['', Validators.required],
  });

  formRatedBooking: FormGroup = this.fb.group({
    userId: [0, [Validators.required]],
    workspaceId: [0, [Validators.required]],
    bookingId: [0, [Validators.required]],
    rating: [5, [Validators.required]],
    title: ['Great workspace', [Validators.required]],
    body: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userIdNumber = localStorage.getItem('misa7aUserId');
      if (userIdNumber) {
        this.userId.set(userIdNumber?.toString());
        this.getAllMyPrevReservations();
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
            console.log(res);
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

  isModalRatedVisible(bookingData: ResBookData) {
    this.formRatedBooking.patchValue({
      userId: Number(this.userId()),
      workspaceId: bookingData.workspaceId,
      bookingId: bookingData.id,
    });

    this.showRatedModal.set(true);
  }

  submitRated() {
    if (this.formRatedBooking.valid) {
      this.ratedService
        .sendRated({
          ...this.formRatedBooking.value,
          rating: Number(this.formRatedBooking.value.rating),
        })
        .subscribe({
          next: () => {
            this.toastrService.success('Booking rating recorded');
            this.closeRatedModal();
            this.formRatedBooking.reset();
          },
        });
    } else {
      this.formRatedBooking.markAllAsTouched();
    }
  }

  closeRatedModal() {
    this.showRatedModal.set(false);
  }
}
