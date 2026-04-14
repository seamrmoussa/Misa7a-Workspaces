import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-inquiry-form',
  imports: [],
  templateUrl: './inquiry-form.component.html',
  styleUrl: './inquiry-form.component.css',
})
export class InquiryFormComponent {
  amenities = signal([
    { id: 1, label: 'Fiber Internet', selected: false },
    { id: 2, label: 'Soundproof Booths', selected: false },
    { id: 3, label: 'Private Kitchen', selected: false },
    { id: 4, label: '24/7 Concierge', selected: false },
  ]);

  // دالة لتغيير حالة الاختيار (Toggle) بدون استخدام ngClass في الـ HTML
  toggleAmenity(id: number) {
    this.amenities.update((items) =>
      items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    );
  }
}
