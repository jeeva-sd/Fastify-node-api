import * as yup from 'yup';
import { createUserPayload, deleteUserPayload, updateUserPayload, userListPayload } from './payload';

export type CreateUserPayload = yup.InferType<typeof createUserPayload>;
export type UserListPayload = yup.InferType<typeof userListPayload>;
export type UpdateUserPayload = yup.InferType<typeof updateUserPayload>;
export type DeleteUserPayload = yup.InferType<typeof deleteUserPayload>;

export interface UserRecord {
    id: number;
    name: string;
    phone: string;
    email: string;
    roleId: number;
    createdAt: Date | null;
    statusId: number;
    deviceId: string | null;
    deviceOS: 'Android' | 'iOS' | 'Windows' | 'Linux' | 'macOS' | 'Other' | null;
    location: unknown;
}