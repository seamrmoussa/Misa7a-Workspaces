import { Component, computed, signal } from '@angular/core';

interface Room {
  id: number;
  name: string;
  price: number;
  capacity: string;
  features: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-booking-page',
  imports: [],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent {
  selectedDate = signal<number>(3);
  selectedTime = signal<string>('01:00 PM');

  // Time Slots Mock Data
  timeSlots = [
    { time: '09:00 AM', disabled: false },
    { time: '10:30 AM', disabled: false },
    { time: '01:00 PM', disabled: false },
    { time: '02:30 PM', disabled: false },
    { time: '04:00 PM', disabled: false },
    { time: '05:30 PM', disabled: true }, // Example of a booked slot
  ];

  // Rooms Data
  rooms = signal<Room[]>([
    {
      id: 1,
      name: 'Monolith Suite',
      price: 45,
      capacity: '4-6 People',
      features: 'Gig-speed',
      description:
        'A focused space with noise-canceling acoustics and floor-to-ceiling city views.',
      image: 'assets/images/room1.jpg', // عدل مسار الصورة
    },
    {
      id: 2,
      name: 'The Athenaeum',
      price: 30,
      capacity: '1-2 People',
      features: 'Air Purified',
      description:
        'The ultimate quiet zone. Perfect for deep creative work or confidential strategy.',
      image: 'assets/images/room2.jpg', // عدل مسار الصورة
    },
  ]);

  selectedRoomId = signal<number>(1);

  // Computed: Get full room object based on selected ID
  selectedRoom = computed(() => {
    return this.rooms().find((r) => r.id === this.selectedRoomId()) || this.rooms()[0];
  });

  // Add-ons Data
  addons = signal<any[]>([
    { id: 1, name: 'Artisan Catering', price: 25, selected: true },
    { id: 2, name: '4K Projector', price: 15, selected: false },
    { id: 3, name: 'Whiteboard Kit', price: 5, selected: false },
  ]);

  // Payment Method State
  paymentMethod = signal<'online' | 'cash'>('online');

  // --- Computed Totals for the Summary ---

  // Calculate Add-ons Total
  addonsTotal = computed(() => {
    return this.addons()
      .filter((a) => a.selected)
      .reduce((sum, current) => sum + current.price, 0);
  });

  // Calculate Grand Total
  grandTotal = computed(() => {
    return this.selectedRoom().price + this.addonsTotal();
  });

  // --- Methods ---

  selectDate(day: number) {
    this.selectedDate.set(day);
  }

  selectTime(time: string, disabled: boolean) {
    if (!disabled) this.selectedTime.set(time);
  }

  selectRoom(id: number) {
    this.selectedRoomId.set(id);
  }

  toggleAddon(id: number) {
    this.addons.update((items) =>
      items.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
    );
  }

  setPaymentMethod(method: 'online' | 'cash') {
    this.paymentMethod.set(method);
  }
}
