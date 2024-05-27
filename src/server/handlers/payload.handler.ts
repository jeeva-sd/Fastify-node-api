import * as fs from 'fs';
import * as path from 'path';
import * as yup from 'yup';
import { ReplayX, RequestX } from '~/server';
import { appConfig } from '~/config';
import { generateFilename } from '~/helpers';
import { clientError } from './response.handler';

export const validatePayload = (schema: yup.AnyObjectSchema) => {
    return async (req: RequestX, reply: ReplayX): Promise<void> => {
        try {
            let formData = {};

            if (req.isMultipart()) {
                const parts: any = await req.parts();
                for await (const part of parts) {
                    if (part.file) {
                        const uploadDir = path.join('public/uploads');
                        const filename = generateFilename(part.filename);
                        const filePath = path.join(uploadDir, filename);

                        await fs.promises.mkdir(uploadDir, { recursive: true });
                        await fs.promises.writeFile(filePath, part.file);
                        formData = { ...formData, [part.fieldname]: `/public/uploads/${filename}` };
                        // formData = { ...formData, [part.fieldname]: part.file };
                    } else {
                        formData = { ...formData, [part.fieldname]: part.value };
                    }
                }
            }

            const params = {
                ...(typeof req.body === 'object' ? req.body : {}),
                ...(typeof req.params === 'object' ? req.params : {}),
                ...(typeof req.query === 'object' ? req.query : {}),
                ...(typeof req.formData === 'object' ? req.formData : {}),
                ...formData
            };

            const validatedParams = await schema.validate(params, appConfig.validation);
            req.payload = { ...validatedParams };
            req.sanitized = true;
        } catch (error) {
            return reply.status(400).send(clientError(error));
        }
    };
};
