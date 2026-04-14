import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-gm-dashboard',
  imports: [],
  templateUrl: './gm-dashboard.component.html',
  styleUrl: './gm-dashboard.component.css',
})
export class GmDashboardComponent {
  kpis = signal({
    totalCreators: '12,842',
    activeSubscriptions: '8,491',
    systemHealth: '99.98%',
  });

  // بيانات حجم الحجوزات (الرسم البياني الشريطي الأيسر)
  bookingVolume = signal([
    { day: 'Mon', percentage: 40 },
    { day: 'Tue', percentage: 65 },
    { day: 'Wed', percentage: 85 },
    { day: 'Thu', percentage: 55 },
    { day: 'Fri', percentage: 90 },
  ]);

  // بيانات سجل النشاطات (الجدول الأيمن)
  recentActivity = signal([
    {
      id: 1,
      initials: 'JD',
      name: 'Julianna Deu itt',
      location: 'Oslo Central',
      action: 'Suite Booking',
      value: '$2,400',
      status: 'CONFIRMED',
    },
    {
      id: 2,
      initials: 'MK',
      name: 'Marcus Kael',
      location: 'Berlin Tiergarten',
      action: 'Membership Renewal',
      value: '$890',
      status: 'CONFIRMED',
    },
    {
      id: 3,
      initials: 'LW',
      name: 'Lydia u ells',
      location: 'London Shoreditch',
      action: 'Event Hosting',
      value: '$12,500',
      status: 'PENDING',
    },
  ]);
}
