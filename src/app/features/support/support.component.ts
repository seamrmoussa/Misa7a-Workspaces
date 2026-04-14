import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-support',
  imports: [],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css',
})
export class SupportComponent {
  currentView = signal<'Admin View' | 'User View'>('Admin View');

  // بيانات فريق العمل
  staffAvailability = signal([
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Concierge Lead',
      status: 'online',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
    {
      id: 2,
      name: 'Marcus Thorne',
      role: 'Tech Specialist',
      status: 'online',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: 3,
      name: 'Elena Ruiz',
      role: 'On Break',
      status: 'away',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ]);

  // التذاكر الواردة
  incomingTickets = signal([
    {
      id: 1,
      priority: 'URGENT',
      title: 'Meeting Room B HVAC Failure',
      location: 'Building 4, Floor 2',
      requester: 'Alex Rivera',
      timeLeft: '4m',
      progress: 80,
    },
    {
      id: 2,
      priority: 'MEDIUM',
      title: 'Guest Wi-Fi Provisioning',
      location: 'Concierge Desk',
      requester: 'Samira K.',
      timeLeft: '22m',
      progress: 30,
    },
    {
      id: 3,
      priority: 'LOW',
      title: 'Printer Paper Refill Request',
      location: 'Shared Hub 2',
      requester: 'Jordan Lee',
      timeLeft: '1h 40m',
      progress: 10,
    },
  ]);

  // بيانات مكتبة المعرفة
  knowledgeLibrary = signal([
    {
      id: 1,
      icon: 'fa-solid fa-wifi',
      title: 'Network & Connectivity',
      desc: 'Setup guides for VPN, high-speed guest access, and troubleshooting.',
    },
    {
      id: 2,
      icon: 'fa-solid fa-print',
      title: 'Hardware Support',
      desc: 'Instructions for cloud printing, scanner usage, and audio-visual setups.',
    },
    {
      id: 3,
      icon: 'fa-solid fa-shield-halved',
      title: 'Access & Security',
      desc: 'Badge management, after-hours protocol, and guest registration.',
    },
    {
      id: 4,
      icon: 'fa-regular fa-calendar',
      title: 'Space Booking',
      desc: 'Maximizing your office experience through smart scheduling tools.',
    },
  ]);

  // دالة لتغيير العرض
  setView(view: 'Admin View' | 'User View') {
    this.currentView.set(view);
  }
}
