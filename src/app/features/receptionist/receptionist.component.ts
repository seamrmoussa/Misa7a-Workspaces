import { Component, computed, signal } from '@angular/core';

interface Asset {
  id: number;
  type: 'desk' | 'suite';
  name: string;
  capacity: number;
  status: 'free' | 'busy';
  usagePercentage: number;
}

@Component({
  selector: 'app-receptionist',
  imports: [],
  templateUrl: './receptionist.component.html',
  styleUrl: './receptionist.component.css',
})
export class ReceptionistComponent {
  recentArrivals = signal<any[]>([
    {
      id: 1,
      name: 'Julian Vane',
      email: 'julian.v@architecture.com',
      avatar: 'https://i.pravatar.cc/150?img=11',
    },
    {
      id: 2,
      name: 'Elena Rodriguez',
      email: 'elena.rod@studio-blue.io',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
  ]);

  selectedClient = signal<any | null>(null);

  assets = signal<Asset[]>([
    {
      id: 1,
      type: 'suite',
      name: 'Glass Atelier 01',
      capacity: 4,
      status: 'busy',
      usagePercentage: 100,
    },
    {
      id: 2,
      type: 'suite',
      name: 'Focus Pod A12',
      capacity: 1,
      status: 'free',
      usagePercentage: 0,
    },
    {
      id: 3,
      type: 'suite',
      name: 'Skyline Suite',
      capacity: 12,
      status: 'free',
      usagePercentage: 30,
    },
    { id: 4, type: 'suite', name: 'Zen Room 04', capacity: 2, status: 'free', usagePercentage: 0 },
    {
      id: 5,
      type: 'suite',
      name: 'Monolith Hall',
      capacity: 20,
      status: 'free',
      usagePercentage: 15,
    },
    {
      id: 6,
      type: 'desk',
      name: 'Shared Desk 09',
      capacity: 1,
      status: 'free',
      usagePercentage: 0,
    },
  ]);

  activeFilter = signal<'All' | 'Desks' | 'Suites'>('All');
  selectedAssetId = signal<number | null>(2); // افتراضياً تم اختيار الغرفة الثانية كما في الصورة

  // --- Computed Signals ---

  filteredAssets = computed(() => {
    if (this.activeFilter() === 'All') return this.assets();
    const targetType = this.activeFilter() === 'Desks' ? 'desk' : 'suite';
    return this.assets().filter((a) => a.type === targetType);
  });

  selectedAsset = computed(() => {
    return this.assets().find((a) => a.id === this.selectedAssetId()) || null;
  });

  // --- Methods ---

  selectClient(client: Asset) {
    this.selectedClient.set(client);
  }

  selectAsset(id: number, status: string) {
    if (status !== 'busy') {
      this.selectedAssetId.set(id);
    }
  }

  setFilter(filter: 'All' | 'Desks' | 'Suites') {
    this.activeFilter.set(filter);
  }
}
