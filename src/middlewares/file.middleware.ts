import * as fs from 'fs';
import * as path from 'path';
import * as yup from 'yup';
import { Exception, MiddlewareFunction, ReplayX, RequestX, clientError } from '~/server';
import { extractError, generateFilename } from '~/helpers';
import { imageRule } from '~/rules';

export const fileGuard = (fieldName?: string, schema: yup.AnySchema = imageRule): MiddlewareFunction => {
    return async (req: RequestX, res: ReplayX) => {
        try {
            let formData: Record<string, string> = {};
            if (!req.isMultipart()) throw new Exception(null, 'Please specify a multipart form data');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const parts: any = await req.parts();

            let fieldFound = false; // Flag to check if the specified field name is found

            for await (const part of parts) {
                if (part.file) {
                    try {
                        await schema.validate({
                            filename: part.filename,
                            mimetype: part.mimetype,
                            size: part.file.bytesRead
                        });
                    } catch (validationError) {
                        if (fieldName && part.fieldname === fieldName) {
                            console.error('FILE VALIDATION ERROR:', extractError(validationError));
                            return res.status(400).send(clientError(validationError));
                        }
                        continue;
                    }

                    if (fieldName && part.fieldname === fieldName) {
                        fieldFound = true;
                        const uploadDir = path.join('public/uploads');
                        const filename = generateFilename(part.filename);
                        const filePath = path.join(uploadDir, filename);

                        await fs.promises.mkdir(uploadDir, { recursive: true });
                        await fs.promises.writeFile(filePath, part.file);
                        formData = { ...formData, [part.fieldname]: `/public/uploads/${filename}` };
                    }
                } else {
                    formData = { ...formData, [part.fieldname]: part.value };
                }
            }

            if (fieldName && !fieldFound) {
                return res.status(404).send(clientError(`Field "${fieldName}" not found`));
            }

            req.formData = formData;
        } catch (error) {
            console.error('FILE PROCESSING ERROR:', extractError(error));
            res.status(400).send(clientError(error));
        }
    };
};