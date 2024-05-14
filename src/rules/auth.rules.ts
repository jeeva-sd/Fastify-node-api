import * as yup from 'yup';

export const loginRule = yup.object({
    email: yup.string().trim().email('Invalid email format').required('Email is required'),
    password: yup.string().trim().required('Password is required'),
});

export const resetPasswordRule = yup.object({
    password: yup.string().trim().required('Password is required'),
    newPassword: yup.string().trim()
        .notOneOf([yup.ref('password')], 'New password must not be the same as the old password')
        .required('New password is required'),
});

export type LoginPayload = yup.InferType<typeof loginRule>;
export type ResetPasswordPayload = yup.InferType<typeof resetPasswordRule>;
