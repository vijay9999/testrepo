export interface UserModel {
    aadharNumber: number;
    address: string;
    addressProof: string;
    addressProofByte: string;
    approvedBy: string;
    bloodDonation: string;
    bloodGroup: string;
    businessCategory: string;
    businessSubCategory: string;
    careTakerName: string;
    createdBy: string;
    dateOfRegister: Date;
    dob: string;
    email: string;
    firstName: string;
    gender: string;
    id: number;
    memberID: number;
    idProof: string;
    idProofByte: string;
    lastName: string;
    mobileNumber: number;
    occupation: string;
    panNumber: string;
    paymentStatus: string;
    qualification: string;
    socialServices: string;
    userImage: string;
    userImageByte: string;
    userRole: string;
    wardNumber: string;
    whatsAppNumber: number;
    isDocumentApproved: boolean;
    isDoucmentRejected: boolean;
    isProfileApproved: boolean;
    isPaymentApproved: boolean;
    isPaymentRejected: boolean;
    isPaymentDone: boolean;
    isProfileUpdationRequired: boolean;
    updateUserId: number;
    documentRejectReason: string;
    paymentRejectReason: string;
    isProfileUpdationApproved: boolean;
    isProfileUpdationRejected: boolean;
    rejectReason: string;
    isChecked: boolean;
    userImageName: string;
    adressProofImage: string;
    idProofImage: string;
}
