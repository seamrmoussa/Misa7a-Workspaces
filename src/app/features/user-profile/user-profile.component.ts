import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  profileData = signal({
    name: 'Julianne Sterling',
    email: 'j.sterling@design.co',
    phone: '+1 (555) 892-4410',
    memberSince: 'October 14, 2022',
    role: 'Standard User',
    walletBalance: '2,480.00',
    activeBookings: 4,
    lifetimeVisits: 142,
  });

  recentActivity = signal([
    {
      id: '#BK-9021',
      location: 'The Zenith Suite',
      room: 'Level 42, Sky Tower',
      date: 'Nov 24, 2024',
      time: '09:00 AM - 01:00 PM',
      status: 'Confirmed',
    },
    {
      id: '#BK-8845',
      location: 'Acoustic Pod B',
      room: 'Main Lobby Annex',
      date: 'Nov 21, 2024',
      time: '02:00 PM - 03:00 PM',
      status: 'Completed',
    },
    {
      id: '#BK-8712',
      location: 'The Glass Library',
      room: 'North Wing, Floor 2',
      date: 'Nov 18, 2024',
      time: '10:00 AM - 05:00 PM',
      status: 'Completed',
    },
  ]);
}
