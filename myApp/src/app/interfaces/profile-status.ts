export interface ProfileStatus{
    memberID: number;
    tempUserID: number;
    currentProfileStatus: string;
    statusChangedBy: string;
    userType: string;
    id: number;
    isDocumentApproved: boolean;
    isDoucmentRejected: boolean;
    isPaymentApproved: boolean;
    isUpdationApproved: boolean;
    rejectReason: string;
}
