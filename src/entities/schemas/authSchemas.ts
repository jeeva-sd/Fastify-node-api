import * as yup from 'yup';

export const registerSchema = yup.object({
    name: yup.string().trim().required().max(20, 'Name must be at most 20 characters'),
    password: yup.string().trim().required().length(8),
}).noUnknown();