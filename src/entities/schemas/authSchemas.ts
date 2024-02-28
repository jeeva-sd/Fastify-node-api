import * as yup from 'yup';
import { appConfig } from '~/config';

export const registerSchema = yup.object({
    name: yup.string().trim().required().max(20, 'Name must be at most 20 characters'),
    password: yup.string().trim().required().length(8),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Invalid phone number').required(),
    roleId: yup.number().oneOf([appConfig.role.superAdmin]).default(appConfig.role.superAdmin),
    email: yup.string().trim().email('Invalid email'),
    orgName: yup.string().trim().required().max(20, 'Name must be at most 20 characters'),
}).noUnknown();