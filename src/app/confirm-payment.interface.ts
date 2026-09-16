export interface ConfirmPayment {
  id: number;
  bookingId: number;
  bookingRef: string;
  userId: number;
  customerEmail: string;
  transactionType: string;
  status: string;
  depositMethod: string;
  paidToNumber: string;
  senderNumber: string;
  referenceCode: string;
  amount: number;
  refundAmount: any;
  screenshotFilename: string;
  reasonOfReject: string;
  adminDecisionAt: string;
  createdOn: string;
}
