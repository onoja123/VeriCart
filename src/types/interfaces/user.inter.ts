import mongoose, { Document, Schema } from "mongoose";
import { UserType, IdentityStatus } from "../enums/user";
import { ilocation } from "./location.inter";
import { Feature } from "../enums/admin";

interface Ibusiness{
    businessType: string;
    businessName: string;
    businessRc: string;
    businessPhone: string;
    businessState: string;
}


interface IOtp {
    code: number | null;
    expiresAt: Date | null;
}


export interface Iuser extends Document{
    firstname: string;
    lastname: string;
    phone: string;
    gender: string;
    email: string;
    userType?: UserType;
    password: string;
    image?: string | '';
    passwordConfirm: string;
    isActive: boolean;
    isAdmin: boolean;
    onlineStatus: boolean;
    verificationToken: string;
    verificationTokenExpires: Date;
    otp: IOtp;
    business: Ibusiness;
    _service: Schema.Types.ObjectId[] | string;
    features: Feature[];
    resetPasswordToken: number;
    resetPasswordExpire: Date;
    verifyEmailToken: string;
    generateUniqueEmployeeId(): Promise<void>;
    identityVerificationStatus: IdentityStatus;
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    generateAuthToken(): string;
    changedPasswordAfter(JWTTimestamp: any): boolean;
    createdAt: Date;
}
