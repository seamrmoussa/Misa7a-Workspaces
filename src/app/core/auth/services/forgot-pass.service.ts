import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForgotPassService {
  private readonly http = inject(HttpClient);

  firstStep(): void {}
  secondStep(): void {}
  thirdStep(): void {}
}
