export interface WorkspaceData {
  id: number;
  workspaceName: string;
  workspaceCode: string;
  bookingRef: string;
  numAttendees: number;
  description: string;
  capacity: number;
  status: number;
  priceHourly: number;
  priceDaily: number;
  priceMonthly: number;
  typeName: string;
  currency: string;
  totalAmount: number;
  floorNumber: number;
  roomNumber: string;
  workspaceTypeId: number;
  isAvailable: number;
  isFeatured: number;
  minBookingHrs: string;
  maxBookingHrs: string;
}
