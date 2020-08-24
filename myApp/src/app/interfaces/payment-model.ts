export interface PaymentModel {
    id: number;
    amount: number;
    paymentDoneById: string;
    paymentDoneForTempUserId: number;
    paymentDoneForMemberId: number;
    upiId: string;
    transactionId: string;
    transactionRef: string;
}
