export interface ProfileStatus{
    memberID: number;
    id: number;
    isDocumentApproved: boolean;
    isDoucmentRejected: boolean;
    rejectReason: string;
    isPaymentApproved: boolean;
    isUpdationApproved: boolean;
    statusChangedBy: string;
    userType: string;
}
