import * as yup from 'yup';

export const imageRule = yup.object().shape({
    filename: yup.string().required(),
    mimetype: yup.string().oneOf(['image/jpeg', 'image/webp'], 'Invalid image format').required(),
    size: yup.number().min(1).max(307200, 'File size should be less than 300KB').required(),
});