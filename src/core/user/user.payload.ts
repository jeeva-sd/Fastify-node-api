import * as yup from 'yup';
import { appConfig } from '~/config';

export const userListPayload = yup.object().shape({
    page: yup.number().min(1).default(1),
    limit: yup.number().min(1).max(100).default(10),
    sortBy: yup.string().oneOf(['createdAt', 'name', 'phone', 'email', 'roleId']).default('createdAt'),
    sortType: yup.string().oneOf(['asc', 'desc']).default('asc'),
    searchTerm: yup.string().trim().default('')
});

export const createUserPayload = yup.object().shape({
    name: yup.string().trim().required('Name is required.'),
    email: yup.string().trim().email('Invalid email format.').required('Email is required.'),
    roleId: yup.number().oneOf([
        appConfig?.role.superAdmin,
        appConfig?.role.admin,
        appConfig?.role.editor,
        appConfig?.role.moderator,
    ], 'Role id is invalid').required('Role ID is required.'),
    password: yup.string().trim().min(6, 'Password must be at least 6 characters long.')
        .required('Password is required.'),
    phone: yup.string().trim().min(10, 'Phone must be at least 10 characters long.')
        .required('Phone is required.'),
});

export const updateUserPayload = yup.object().shape({
    id: yup.number().required('ID is required.'),
    name: yup.string().trim(),
    email: yup.string().trim().email('Invalid email format.'),
    roleId: yup.number().oneOf([
        appConfig?.role.superAdmin,
        appConfig?.role.admin,
        appConfig?.role.editor,
        appConfig?.role.moderator,
    ], 'Role id is invalid'),
    phone: yup.string().trim().min(10, 'Phone must be at least 10 characters long.'),
});

export const deleteUserPayload = yup.object().shape({
    id: yup.number().required('User id is required.'),
});