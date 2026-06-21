export interface ReviewRes {
  id: number;
  userId: number;
  userFullName: string;
  workspaceId: number;
  workspaceName: string;
  bookingId: number;
  rating: number;
  title: string;
  body: string;
  isVerified: number;
  isPublished: number;
  adminResponse: AdminResponse;
  createdOn: string;
  updatedOn: string;
}

export interface AdminResponse {
  id: number;
  responderId: number;
  responderFullName: string;
  responseBody: string;
  createdOn: string;
  updatedOn: string;
}
