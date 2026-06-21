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
  isModalAdminReplayVisible = signal<boolean>(false);
  ratingCounts = signal<RatedCountsRes[]>([]);

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

  showSummaryReview() {
    this.ratedService.getAvgReview().subscribe({
      next: (res) => {
        this.totalAvg.set(res.data);
      },
    });
  }

  showAllReview() {
    this.ratedService.getAllReview().subscribe({
      next: (res) => {
        this.allReviewData.set(res.data.content);
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
}
