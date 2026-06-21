export interface BookResData {
  id: number;
  bookingRef: string;
  userId: number;
  workspaceId: number;
  workspaceName: string;
  startDatetime: string;
  endDatetime: string;
  durationType: string;
  status: string;
  numAttendees: number;
  purpose: string;
  basePrice: number;
  discountAmount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  cancelledAt: string;
  cancelReason: string;
}
