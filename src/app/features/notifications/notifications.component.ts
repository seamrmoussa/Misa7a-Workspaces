import { Component, signal } from '@angular/core';

interface NotificationItem {
  id: number;
  type: 'urgent' | 'upcoming' | 'update' | 'archived';
  title: string;
  messageHtml: string;
  timeAgo?: string;
  badge?: string;
  primaryAction?: string;
  secondaryAction?: string;
}

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent {
  isAlertsDropdownOpen = signal(true);

  toggleAlertsDropdown() {
    this.isAlertsDropdownOpen.update((val) => !val);
  }

  notifications = signal<NotificationItem[]>([
    {
      id: 1,
      type: 'urgent',
      title: 'Alert: Booking ending soon',
      messageHtml:
        'Your session in <strong class="text-mainColorDark">The Obsidian Suite (Room 402)</strong> is scheduled to end. Start packing your belongings or extend your booking via the app if available.',
      primaryAction: 'Extend Booking',
      secondaryAction: 'Dismiss',
    },
    {
      id: 2,
      type: 'upcoming',
      title: 'Reminder: Booking starts in 10 minutes',
      messageHtml:
        'Your reservation for <strong class="text-mainColorDark">Zen Workspace B</strong> starts shortly. The digital key has been activated in your wallet.',
      timeAgo: '8m ago',
      badge: 'UPCOMING',
      primaryAction: 'View Digital Key',
      secondaryAction: 'Get Directions',
    },
    {
      id: 3,
      type: 'update',
      title: 'Concierge Update: New Amenities',
      messageHtml:
        "We've added premium pour-over coffee stations to all 4th-floor lounges. Enjoy complementary beans from our local partner, Sanctuary Roasts.",
      timeAgo: '1h ago',
      badge: 'UPDATE',
    },
    {
      id: 4,
      type: 'archived',
      title: 'Booking Confirmed: Boardroom Alpha',
      messageHtml: 'Your booking for next Tuesday at 9:00 AM has been successfully processed.',
      timeAgo: 'Yesterday',
      badge: 'ARCHIVED',
    },
  ]);
}
