import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './../../core/service/flowbite.service';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CallAdminDataService } from '../../core/service/call-admin-data.service';
import { WorkspaceData } from '../../workspace-data.interface';
import { BookRoomService } from '../../core/service/book-room.service';
import { ToastrService } from 'ngx-toastr';
import { ResBookData } from '../../res-book-data.interface';
import { Router } from '@angular/router';

interface Room {
  id: number;
  name: string;
  price: number;
  capacity: string;
  features: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-booking-page',
  imports: [ReactiveFormsModule],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent implements OnInit {
  constructor(private FlowbiteService: FlowbiteService) {}

  private readonly callAdminDataService = inject(CallAdminDataService);
  private readonly bookRoomService = inject(BookRoomService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  userId = signal<number | null>(null);
  selectedDate = signal<number>(3);
  selectedTime = signal<string>('01:00 PM');
  workspaces = signal<WorkspaceData[]>([]);
  totalWorkspaces = signal<WorkspaceData[]>([]);
  selectedRoomId = signal<number>(0);
  resAfterBooking = signal<Partial<ResBookData>>({});
  showBtnFilter = signal<boolean>(false);
  isModalBookVisible = signal<boolean>(false);
  isModalConfirmBookingVisible = signal<boolean>(false);
  isCheckModalVisible = signal<boolean>(false);
  isCheckRoomAvailable = signal<boolean>(false);

  formCheckBookingAvailability: FormGroup = this.fb.group({
    startTimeSelected: [this.getTodayAtTime('09:00'), Validators.required],
    endTimeSelected: [this.getTodayAtTime('10:00'), Validators.required],
  });

  formConfirmBooking: FormGroup = this.fb.group({
    userId: [0, Validators.required],
    workspaceId: [0, Validators.required],
    startDatetime: [
      this.formCheckBookingAvailability.get('startTimeSelected')?.value,
      Validators.required,
    ],
    endDatetime: [
      this.formCheckBookingAvailability.get('endTimeSelected')?.value,
      Validators.required,
    ],
    durationType: ['HOURLY', Validators.required],
    numAttendees: [1, Validators.required],
    purpose: ['Meeting', Validators.required],
    promoCodeId: [1, Validators.required],
    internalNotes: ['Nothing', Validators.required],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.FlowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
        const userIdNow = Number(localStorage.getItem('misa7aUserId'));
        if (userIdNow) {
          this.userId.set(userIdNow);
        }
      });
    }
    this.getWorkspaces();
  }

  private getTodayAtTime(time: string): string {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T${time}`;
  }

  getWorkspaces() {
    this.callAdminDataService.getAllWorkspace().subscribe({
      next: (res) => {
        this.totalWorkspaces.set(res.data);
        this.workspaces.set(this.totalWorkspaces());
      },
    });
  }

  selectRoom(id: number) {
    this.selectedRoomId.set(id);
  }

  resetFilter() {
    this.workspaces.set(this.totalWorkspaces());
    this.showBtnFilter.set(false);
  }

  checkIsAvailableRoomId() {
    if (this.formCheckBookingAvailability.valid && this.selectedRoomId()) {
      this.bookRoomService
        .checkAvailabilityRoomId(this.formCheckBookingAvailability.value, this.selectedRoomId())
        .subscribe({
          next: (res) => {
            this.isCheckRoomAvailable.set(res.data.available);
            this.isCheckModalVisible.set(true);
          },
        });
    } else {
      this.formCheckBookingAvailability.markAllAsTouched();
    }
  }

  showAndCloseCheckModalByRoom() {
    this.isCheckModalVisible.update((v) => !v);
  }

  checkIsvAvailableRoomDate() {
    if (this.formCheckBookingAvailability.valid) {
      this.bookRoomService
        .checkAvailabilityRoomByDate(this.formCheckBookingAvailability.value)
        .subscribe({
          next: (res) => {
            this.showBtnFilter.set(true);
            this.workspaces.set(res.data);
          },
        });
    } else {
      this.formCheckBookingAvailability.markAllAsTouched();
    }
  }

  showModalForBook(spaceId: number) {
    const fullFormBookingData = {
      userId: this.userId(),
      workspaceId: spaceId,
      startDatetime: this.formCheckBookingAvailability.get('startTimeSelected')?.value,
      endDatetime: this.formCheckBookingAvailability.get('endTimeSelected')?.value,
    };
    this.formConfirmBooking.patchValue(fullFormBookingData);
    this.isModalBookVisible.set(true);
  }

  hideModalForBook() {
    this.isModalBookVisible.set(false);
  }

  isLoggedInUser() {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userId = localStorage.getItem('misa7aUserId');
      if (userId) {
        this.confirmBooking();
      } else {
        this.router.navigate(['/login']);
        this.toastrService.warning('Please logIn first');
      }
    }
  }

  confirmBooking() {
    const finalConfirmData = this.formConfirmBooking.value;

    this.bookRoomService
      .confirmBooking({
        ...this.formConfirmBooking.value,
        startDatetime: this.formConfirmBooking.value.startDatetime + ':00.000Z',
        endDatetime: this.formConfirmBooking.value.endDatetime + ':00.000Z',
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.resAfterBooking.set(res.data);
          this.toastrService.success('The booking request has been sent');
          this.isModalBookVisible.set(false);
          this.showModalSuccess();
          this.isCheckModalVisible.set(false);
          this.selectedRoomId.set(0);
        },
      });
  }

  showModalSuccess() {
    this.isModalConfirmBookingVisible.update((v) => !v);
  }
}
