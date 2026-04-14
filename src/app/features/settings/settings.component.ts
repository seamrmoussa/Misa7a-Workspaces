import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  profile = signal({
    name: 'Elena Rodriguez',
    title: 'Principal Architect',
    bio: 'Crafting spaces that breathe and inspire.\nMember since 2022.',
  });

  // حالة الإشعارات
  notifications = signal({
    email: true,
    booking: true,
    system: false,
  });

  // دالة لتغيير حالة الإشعارات
  toggleNotification(key: 'email' | 'booking' | 'system') {
    this.notifications.update((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }
}
