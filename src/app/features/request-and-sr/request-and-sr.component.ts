import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { AllRequestsResponse } from '../../all-requests-response.interface';
import { ContactUsService } from '../../core/service/contact-us.service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-request-and-sr',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './request-and-sr.component.html',
  styleUrl: './request-and-sr.component.css',
})
export class RequestAndSrComponent implements OnInit {
  private readonly contactUsService = inject(ContactUsService);
  private readonly toastrService = inject(ToastrService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getAllRequests();
    }
  }

  allRequest = signal<AllRequestsResponse[]>([]);
  allReqData = signal<AllRequestsResponse[]>([]);
  reqDataForUser = signal<AllRequestsResponse[]>([]);
  openReqData = signal<AllRequestsResponse[]>([]);
  closedReqData = signal<AllRequestsResponse[]>([]);
  totalPage = signal<number>(0);
  PageSize = signal<number>(20);
  currentPage = signal<number>(0);
  isOpenModalToConfirmCloseSr = signal(<boolean>false);
  requestIdNowToClose = signal<number>(0);
  currentFilterMode = signal<string>('');

  FormUserId: FormControl = new FormControl('', Validators.required);

  pagesArray = computed(() => {
    const total = this.totalPage();
    const current = this.currentPage();
    const delta = 2;

    if (total <= 9) {
      return Array.from({ length: total }, (_, i) => i);
    }

    const pages: (string | number)[] = [];

    let start = Math.max(1, current - delta);
    let end = Math.min(total - 2, current + delta);

    if (current <= 3) {
      end = 5;
    }
    if (current >= total - 4) {
      start = total - 6;
    }

    pages.push(0);
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

  checkFilterMode() {
    if (this.currentFilterMode() === 'All') {
      this.getAllRequests(true);
    } else if (this.currentFilterMode() === 'OPEN') {
      this.getReqStatus('OPEN', true);
    } else if (this.currentFilterMode() === 'CLOSED') {
      this.getReqStatus('CLOSED', true);
    } else if (this.currentFilterMode() === 'USER') {
      this.getRequestForUser(true);
    }
  }

  prevPage() {
    if (this.currentPage() > 0) {
      this.currentPage.update((p) => p - 1);
      this.checkFilterMode();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPage() - 1) {
      this.currentPage.update((p) => p + 1);
      this.checkFilterMode();
    }
  }

  getAllRequests(isPagination: boolean = false) {
    this.resetAllData('All');
    this.FormUserId.reset();
    if (!isPagination) {
      this.currentPage.set(0);
    }
    const sortCriteria = ['status,asc', 'createdOn,desc'];
    this.contactUsService
      .getAllRequestForAdmin(this.currentPage(), this.PageSize(), sortCriteria)
      .subscribe({
        next: (res) => {
          this.currentFilterMode.set('All');
          this.allReqData.set(res.data.content);
          this.allRequest.set(this.allReqData());
          this.totalPage.set(res.data.totalPages);
          this.currentPage.set(res.data.number);
        },
      });
  }

  getRequestForUser(isPagination: boolean = false) {
    if (!isPagination) {
      this.resetAllData('USER');
      this.currentPage.set(0);
    }
    const sortCriteria = ['status,asc', 'createdOn,desc'];
    if (this.FormUserId.valid) {
      this.contactUsService
        .getRequestForOneUser(this.currentPage(), this.FormUserId.value, sortCriteria)
        .subscribe({
          next: (res) => {
            this.reqDataForUser.set(res.data.content);
            this.allRequest.set(this.reqDataForUser());
            this.totalPage.set(res.data.totalPages);
            this.currentPage.set(res.data.number);
          },
        });
    } else {
      this.FormUserId.markAsTouched();
    }
  }

  getReqStatus(status: string, isPagination: boolean = false) {
    if (!isPagination) {
      this.currentPage.set(0);
    }
    this.contactUsService.getReqAsPerStatus(status, this.currentPage()).subscribe({
      next: (res) => {
        if (status === 'OPEN') {
          this.currentFilterMode.set('OPEN');
          this.openReqData.set(res.data.content);
          this.allRequest.set(this.openReqData());
          this.closedReqData.set([]);
        } else if (status === 'CLOSED') {
          this.currentFilterMode.set('CLOSED');
          this.closedReqData.set(res.data.content);
          this.allRequest.set(this.closedReqData());
          this.openReqData.set([]);
        }
        this.totalPage.set(res.data.totalPages);
        this.currentPage.set(res.data.number);
      },
    });
  }

  resetAllData(status: string) {
    this.currentFilterMode.set(status);
    if (status !== 'USER') {
      this.FormUserId.reset();
    }
    this.reqDataForUser.set([]);
    this.restOpenAndClosed();
  }

  restOpenAndClosed() {
    this.openReqData.set([]);
    this.closedReqData.set([]);
  }

  showModalToConfirmCloseSr(requestId: number) {
    this.requestIdNowToClose.set(requestId);
    this.isOpenModalToConfirmCloseSr.set(true);
  }

  closeModalToConfirmCloseSr() {
    this.isOpenModalToConfirmCloseSr.set(false);
  }

  confirmCloseSr() {
    this.contactUsService.closeRequest(this.requestIdNowToClose()).subscribe({
      next: (res) => {
        console.log(res);
        this.toastrService.success('The order was successfully closed.');
        this.closeModalToConfirmCloseSr();
        this.getAllRequests();
      },
    });
  }
}
