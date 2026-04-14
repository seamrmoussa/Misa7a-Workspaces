import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-booking-history',
  imports: [],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css',
})
export class BookingHistoryComponent {
  activeFilter = signal<'All' | 'Completed' | 'Cancelled'>('All');

  // حالة نص البحث
  searchQuery = signal<string>('');

  // إحصائيات الجزء السفلي
  stats = signal({
    loyaltyHours: 142,
    hoursToElite: 8,
    totalBookings: 24,
    avgRating: 4.9,
  });

  // بيانات الحجوزات
  bookings = signal([
    {
      id: '#AS-99210',
      locationName: 'The Zenith Suite',
      address: 'Manhattan Sanctuary, Floor 42',
      date: 'October 24, 2023',
      time: '09:00 AM - 05:00 PM',
      duration: '8h',
      status: 'Completed',
      rating: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1600607687920-4e2a09be1587?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      actions: { primary: 'Rebook Same Setup', secondary: 'Review Sanctuary' },
    },
    {
      id: '#AS-98442',
      locationName: 'The Atrium Lounge',
      address: 'Brooklyn Commons',
      date: 'September 12, 2023',
      time: '11:30 AM - 02:30 PM',
      duration: '3h',
      status: 'Cancelled',
      subStatus: 'Refund Processed',
      imageUrl:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      actions: { primary: 'Rebook Same Setup', secondary: 'Review Unavailable' },
    },
    {
      id: '#AS-97551',
      locationName: 'Focus Capsule 04',
      address: 'London West End',
      date: 'August 29, 2023',
      time: '08:00 AM - 12:00 PM',
      duration: '4h',
      status: 'Completed',
      subStatus: 'View Receipt',
      imageUrl:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      actions: { primary: 'Rebook Same Setup', secondary: 'Leave a Review' },
    },
  ]);

  // دالة لتغيير الفلتر
  setFilter(filter: 'All' | 'Completed' | 'Cancelled') {
    this.activeFilter.set(filter);
  }

  // مصفوفة مشتقة للحجوزات المفلترة لسهولة عرضها في الـ HTML
  filteredBookings = computed(() => {
    const currentFilter = this.activeFilter();
    if (currentFilter === 'All') {
      return this.bookings();
    }
    return this.bookings().filter((b) => b.status === currentFilter);
  });
}
