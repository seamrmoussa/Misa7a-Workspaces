import { AuthService } from './../../core/auth/services/auth.service';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RatedService } from '../../core/service/rated.service';
import { DatePipe, DecimalPipe, isPlatformBrowser } from '@angular/common';
import { ReviewRes } from '../../review-res.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface RatedCountsRes {
  rating: number;
  totalReviews: number;
}

interface avgRating {
  totalReviews: number;
  averageRating: number;
}

@Component({
  selector: 'app-review',
  imports: [ReactiveFormsModule, DecimalPipe, DatePipe],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  private readonly ratedService = inject(RatedService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);

  readonly roleType = computed<string>(() => this.authService.tokenData()?.roles[0]);
  private readonly nowReteId = signal<number>(0);
  private readonly userId = signal<number>(0);
  totalAvg = signal<avgRating>({
    totalReviews: 0,
    averageRating: 0.0,
  });
  allReviewData = signal<ReviewRes[]>([]);
  totalPage = signal<number>(0);
  currentPage = signal<number>(0);
  isModalAdminReplayVisible = signal<boolean>(false);
  ratingCounts = signal<RatedCountsRes[]>([]);
  reviewFilterByRate = signal<boolean>(false);

  FormRateAdmin: FormGroup = this.fb.group({
    responderId: [this.userId(), Validators.required],
    responseBody: ['Thank you, and we hope to see you again.', Validators.required],
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const userId = localStorage.getItem('misa7aUserId');
      if (userId) {
        this.userId.set(Number(userId));
      }
      this.showSummaryReview();
      this.showAllReview();
      this.showAllRatedCounts();
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
      this.showAllReview();
    }
  }

  nextPage() {
    if (this.currentPage() < this.totalPage() - 1) {
      this.currentPage.update((p) => p + 1);
      this.showAllReview();
    }
  }

  goToPage(pageNumber: number) {
    if (this.currentPage() !== pageNumber) {
      this.currentPage.set(pageNumber);
      this.showAllReview();
    }
  }

  showSummaryReview() {
    this.ratedService.getAvgReview().subscribe({
      next: (res) => {
        this.totalAvg.set(res.data);
      },
    });
  }

  showAllReview() {
    this.ratedService.getAllReview(this.currentPage()).subscribe({
      next: (res) => {
        this.totalPage.set(res.data.totalPages);
        this.currentPage.set(res.data.number);
        this.allReviewData.set(res.data.content);
      },
    });
  }

  getReviewByRate(ratingNumber: number) {
    this.ratedService.getReviewByRating(ratingNumber, this.currentPage()).subscribe({
      next: (res) => {
        this.totalPage.set(res.data.totalPages);
        this.currentPage.set(res.data.number);
        this.allReviewData.set(res.data.content);
        this.reviewFilterByRate.set(true);
      },
    });
  }

  showModalAdminReply(rateId: number) {
    this.nowReteId.set(rateId);
    this.isModalAdminReplayVisible.set(true);
  }

  closeModalAdminReply() {
    this.isModalAdminReplayVisible.set(false);
  }

  sendAdminReply() {
    this.FormRateAdmin.patchValue({
      responderId: this.userId(),
    });

    if (this.FormRateAdmin.valid) {
      this.ratedService
        .responseAdminToReview(this.nowReteId(), this.FormRateAdmin.value)
        .subscribe({
          next: () => {
            this.toastrService.success('Your response has been successfully registered.');
            this.closeModalAdminReply();
            this.showAllReview();
          },
        });
    } else {
      this.FormRateAdmin.markAllAsTouched();
    }
  }

  showAllRatedCounts() {
    this.ratedService.getRatedCounts().subscribe({
      next: (res) => {
        console.log(res);
        this.ratingCounts.set(res.data);
      },
    });
  }
  getStarsArray(rating: number): any[] {
    return new Array(rating);
  }

  restFindReviewByRate() {
    this.reviewFilterByRate.set(false);
    this.showAllReview();
  }
}
