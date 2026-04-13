import { Component, signal } from '@angular/core';

interface Booking {
  id: number;
  space: string;
  client: string;
  tier: string;
  date: string;
  duration: string;
  status: 'CONFIRMED' | 'PENDING' | 'ON HOLD';
  image: string;
}

interface TimelineSegment {
  type: 'booked' | 'blackout' | 'available';
  width: string; // Percentage width
}

interface TimelineRow {
  id: number;
  roomName: string;
  segments: TimelineSegment[];
}

@Component({
  selector: 'app-admin-control-panel',
  imports: [],
  templateUrl: './admin-control-panel.component.html',
  styleUrl: './admin-control-panel.component.css',
})
export class AdminControlPanelComponent {
  // --- State Signals ---

  recentBookings = signal<Booking[]>([
    {
      id: 1,
      space: 'Zenith Boardroom',
      client: 'Michael Chen',
      tier: 'Pro Tier',
      date: 'Today, 2:00 PM',
      duration: '2 Hour Duration',
      status: 'CONFIRMED',
      image: 'assets/images/room-zenith.jpg', // قم بتعديل مسار الصورة
    },
    {
      id: 2,
      space: 'The Loft Lounge',
      client: 'Sarah Jenkins',
      tier: 'Enterprise',
      date: 'Tomorrow, 9:00 AM',
      duration: 'All Day Access',
      status: 'PENDING',
      image: 'assets/images/room-loft.jpg',
    },
    {
      id: 3,
      space: 'Focus Pod 04',
      client: 'David Wu',
      tier: 'Guest',
      date: 'Dec 14, 11:30 AM',
      duration: '1 Hour Session',
      status: 'ON HOLD',
      image: 'assets/images/room-pod.jpg',
    },
  ]);

  timelines = signal<TimelineRow[]>([
    {
      id: 1,
      roomName: 'Zenith Boardroom - Dec 12 Schedule',
      segments: [
        { type: 'booked', width: '25%' }, // 08:00 - 10:00
        { type: 'available', width: '25%' }, // 10:00 - 12:00
        { type: 'blackout', width: '12.5%' }, // 12:00 - 01:00
        { type: 'booked', width: '37.5%' }, // 01:00 - 04:00
      ],
    },
    {
      id: 2,
      roomName: 'The Loft Lounge - Dec 12 Schedule',
      segments: [
        { type: 'booked', width: '50%' }, // 08:00 - 12:00
        { type: 'available', width: '12.5%' }, // 12:00 - 01:00
        { type: 'booked', width: '37.5%' }, // 01:00 - 04:00
      ],
    },
  ]);

  // دالة مساعدة لتحديد ألوان كلاسات الحالة (Status Badges)
  getStatusClass(status: string): string {
    if (status === 'CONFIRMED') return 'bg-badgeBgColor text-badgeTextColor';
    if (status === 'PENDING') return 'bg-mainExtraLight text-mainColorDark';
    if (status === 'ON HOLD') return 'bg-beigeBgBadge text-beigeTextBadge';
    return 'bg-gray-100 text-gray-600';
  }
}
