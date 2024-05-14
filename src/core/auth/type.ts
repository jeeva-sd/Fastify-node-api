import * as yup from 'yup';
import { loginPayload, resetPasswordPayload } from '../../interceptors/payloadSchema/auth.payload';

export type LoginPayload = yup.InferType<typeof loginPayload>;
export type ResetPasswordPayload = yup.InferType<typeof resetPasswordPayload>;

export interface TokenData {
    userId: number;
    roleId: number;
}

export interface UserData {
    userData: TokenData;
}

export interface LoginRes {
    id: number;
    name: string;
    password: string;
    email: string;
}