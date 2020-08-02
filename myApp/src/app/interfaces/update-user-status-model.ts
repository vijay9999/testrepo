export interface UpdateUserStatusModel {
    id: number;
    updateUserId: number;
    isUpdationApproved: boolean;
    isUpdationRejected: boolean;
    rejectReason: string;
}
